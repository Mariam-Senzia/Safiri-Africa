import cloudinary.uploader
from flask import Flask,jsonify,request,make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from models import db, User, Destination, Media, Like, Comment
import os
import cloudinary
from cloudinary import uploader
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///app.db'
app.config['SQLALCHEMY_DATABASE_URI']= os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

migrate = Migrate(app, db)
db.init_app(app)
CORS(app)
api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

cloudinary.config( 
        cloud_name = os.getenv("CLOUD_NAME"), 
        api_key = os.getenv("API_KEY"), 
        api_secret = os.getenv("API_SECRET")
    )

# CRUD FOR DESTINATIONS
class DestinationResource(Resource):
    def get(self):
        #Fetch the latest destinations first (sorted by id in descending order)
        destinations = Destination.query.order_by(Destination.id.desc()).all()

        if destinations:
            return jsonify([{'id': destination.id, 'title':destination.title,'location':destination.location,'description': destination.description, 'type': destination.type, 'user_id': destination.user_id,'username': destination.username, 'url':destination.url,'region':destination.region} for destination in destinations])
        else:
            return jsonify({'message':'Destination not found'})
        
    def post(self):
        try:
            username = request.form.get('username')
            title = request.form.get('title')
            location = request.form.get('location')
            description = request.form.get('description')
            type = request.form.get('type')
            region = request.form.get('region')
            url = request.files.get('url')

            # upload image to clodinary
            if type == 'video':
                upload_media = cloudinary.uploader.upload(url, resource_type='video')
            else:
                upload_media = cloudinary.uploader.upload(url)
            new_url = upload_media['secure_url']

            new_Destination = Destination(
                username = username,
                title = title,
                location = location,
                description = description,
                type = type,
                region = region,
                url = new_url
            ) 
            db.session.add(new_Destination)
            db.session.commit()

            # return jsonify({'message':'Destination created successfully'})
            # return jsonify([{}])
        
        except Exception as e:
            print(e)
            return jsonify({'message':'Error ceating destination'})

    def put(self,id):
        destination = Destination.query.get(id)

        if destination:
            data= request.get_json()
            destination.title = data.get('title', destination.title)
            destination.location = data.get('location', destination.location)
            destination.description = data.get('description', destination.description)
            destination.url = data.get('url', destination.url)
            destination.type = data.get('type', destination.type)
            destination.region = data.get('region', destination.region)

            db.session.commit()
            return jsonify({'message':'Destination updated successfully'})
        
        else:
            return jsonify({'message':'Error updating destination'})
        
    def delete(self,id):
        destination = Destination.query.get(id)

        if destination:
            db.session.delete(destination)
            db.session.commit()

            return jsonify({'message': 'Destination deleted successfully'})
        
        else:
            return jsonify({'message':'Error deleting destination'})
        
api.add_resource(DestinationResource,'/destinations','/destinations/<int:id>')

#CRUD FOR USER
class UserResource(Resource):
    def get(self):
        users = User.query.all()

        if users:
            return jsonify([{'id': user.id,'name': user.name,'email':user.email,'description': user.description,'profile_url': user.profile_url} for user in users])
        else:
            return jsonify({'message': 'Users not found'})
        
    def post(self):
        try:
            # receiving data as json
            formData = request.get_json()

            name = formData.get('name')
            email = formData.get('email')
            password = formData.get('password')


            if not all([name, email, password]):
                return jsonify({"error": "Username, email, password, and role are required fields"})

            user_exists = User.query.filter_by(email=email).first()
            if user_exists:
                return jsonify({'error': 'User with same email already exists'})


            hashedPassword = bcrypt.generate_password_hash(password)

            newUser = User(
                name = name,
                email = email,
                password = hashedPassword
            )
            db.session.add(newUser)
            db.session.commit()

            return jsonify({'message':'User created successfully'})

        except Exception as e:
            print(e)
            return jsonify({'message':'Error creating user'})
        
    def delete(self,id):
        user = User.query.get(id)

        if user:
            db.session.delete(user)
            db.session.commit()

            return jsonify({'message':'User deleted successfully'})
        
        else:
            return jsonify({'message':'Error deleting user'})
        
api.add_resource(UserResource, '/users','/users/<int:id>')


# user login
class UserLoginResource(Resource):
    def post(self):
        formData = request.get_json()
        email = formData.get('email')
        password = formData.get('password')

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password,password):
            access_token = create_access_token(identity = {'email':user.email, 'name':user.name})
            refresh_token = create_refresh_token(identity = {'email':user.email, 'name':user.name})

            return jsonify({
                'access_token':access_token,
                'refresh_token': refresh_token,
                'name':user.name,
                'profile_url': user.profile_url
            })
        
        else:
            return make_response(jsonify({
                'message':'Invalid email or password'
            }), 401)
        
api.add_resource(UserLoginResource,'/login')

# user profile
class UserProfileResource(Resource):
    def get(self):
        users = User.query.all()

        if users:
            return jsonify([{'id': user.id,'name':user.name,'email': user.email,'description': user.description,'country': user.country,'city': user.city,'profile_url': user.profile_url} for user in users])
        else:
            return jsonify({'message':'Users not found'})
        
    def put(self):
        try:
            name = request.form.get('name')
            email = request.form.get('email')
            description = request.form.get('description')
            country = request.form.get('country')
            city = request.form.get('city')
            profile_url = request.files.get('profile_url')

            user_id = request.form.get('id')
            user = User.query.get(user_id)

            # Update the user details
            if not user:
                return jsonify({'message':'User not found'})
            
            user.name = name
            user.email = email
            user.description = description
            user.country = country
            user.city = city

            if profile_url:
                upload_media = cloudinary.uploader.upload(profile_url)
                user.profile_url = upload_media['secure_url']

            db.session.commit()

            return jsonify({'message':'Profile updated successfully'})
        
        except Exception as e:
            print(e)
            return jsonify({'message':'Error updating profile'})
        
api.add_resource(UserProfileResource,'/userProfile')

# CRUD FOR LIKES
class LikesResource(Resource):
    def get(self):
        likes = Like.query.all()

        if likes:
            return jsonify([{'id':like.id,'user_id':like.user_id, 'destination_id':like.destination_id,'number_of_likes': like.number_of_likes} for like in likes])
        else:
            return jsonify({'message':'Likes not found'})
        
    def post(self):
        try:
            data = request.get_json()
            user_id = data.get('user_id')
            destination_id = data.get('destination_id')
            number_of_likes = data.get('number_of_likes')
            
            newLike = Like(
                user_id = user_id,
                destination_id = destination_id,
                number_of_likes = number_of_likes
            )
            db.session.add(newLike)
            db.session.commit()

            return jsonify({'message':'Liked successfully'})
        
        except Exception as e:
            print(e)
            return jsonify({'message':'Error posting likes'})
        
    def delete(self,id):
        like = Like.query.filter_by(id = id).first()

        if like:
            db.session.delete(like)
            db.session.commit()

            return jsonify({'message':'Like deleted successfully'})
        
        else:
            return jsonify({'message':'Error deleting Like'})
        
api.add_resource(LikesResource,'/likes' ,'/likes/<int:id>')


# CRUD FOR COMMENTS
class CommentResource(Resource):
    def get(self):
        # Fetch the latest comments first (sorted by id in descending order)
        comments = Comment.query.order_by(Comment.id.desc()).all()

        if comments:
            return jsonify([{'id': comment.id,'user_id': comment.user_id,'destination_id': comment.destination_id,'comment_text': comment.comment_text,'username': comment.username} for comment in comments])

        else:
            return jsonify({'message':'Comments not found'})
        
    def post(self):
        try:
            data = request.get_json()
            user_id = data.get('user_id')
            destination_id = data.get('destination_id')
            comment_text = data.get('comment_text')
            username = data.get('username')

            new_comment = Comment(
                user_id = user_id,
                destination_id = destination_id,
                comment_text = comment_text,
                username = username
            )
            db.session.add(new_comment)
            db.session.commit()

            return jsonify({'message':'Comment posted successfully'})

        except Exception as e:
            print(e)
            return jsonify({'message':'Error posting comment'})
        
    def delete(self,id):
        comment = Comment.query.filter_by(id = id).first()

        if comment:
            db.session.delete(comment)
            db.session.commit()

            return jsonify({'message':'Comment deleted successfully'})
        
        else: 
            return jsonify({'message':'Error deleting comment'})


api.add_resource(CommentResource,'/comments','/comments/<int:id>')




if __name__=='__main__':
    app.run(port=5555, debug=True)