import cloudinary.uploader
from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from models import db, User, Destination, Media, Like
import os
import cloudinary
from cloudinary import uploader
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
app.config['JWT_SECRET_KEY'] = "e27c00e982d1d07709adb9eb"

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
        destinations = Destination.query.all()

        if destinations:
            return jsonify([{'id': destination.id, 'title':destination.title,'location':destination.location,'description': destination.description, 'type': destination.type, 'user_id': destination.user_id,'url':destination.url,'region':destination.region} for destination in destinations])
        else:
            return jsonify({'message':'Destination not found'})
        
    def post(self):
        try:
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
                title = title,
                location = location,
                description = description,
                type = type,
                region = region,
                url = new_url
            ) 
            db.session.add(new_Destination)
            db.session.commit()

            return jsonify({'message':'Destination created successfully'})
        
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
            return jsonify([{'name': user.name,'email':user.email} for user in users])
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
            access_token = create_access_token(identity = {'email':user.email})
            refresh_token = create_refresh_token(identity = {'email':user.email})

            return jsonify({
                'access_token':access_token,
                'refresh_token': refresh_token,
                'name':user.name
            })
        
        else:
            return jsonify({
                'message':'Invalid email or password'
            })
        
api.add_resource(UserLoginResource,'/login')

# user profile
class UserProfileResource(Resource):
    def get(self):
        users = User.query.all()

        if users:
            return jsonify([{'user':user.name,'description': user.description,'profile_url': user.profile_url} for user in users])
        else:
            return jsonify({'message':'Users not found'})
        
    def post(self):
        try:
            name = request.form.get('name')
            description = request.form.get('description')
            profile_url = request.files.get('profile_url')

            upload_media = cloudinary.uploader.upload(profile_url)
            new_url = upload_media['secure_url']

            new_Profile = User(
                name = name,
                description = description,
                profile_url = new_url
            )
            db.session.add(new_Profile)
            db.session.commit()

            return jsonify({'message':'Profile updated successfully'})
        
        except Exception as e:
            print(e)
            return jsonify({'message':'Error updating profile'})
        
api.add_resource(UserProfileResource,'/userProfile')
        


if __name__=='__main__':
    app.run(port=5555, debug=True)