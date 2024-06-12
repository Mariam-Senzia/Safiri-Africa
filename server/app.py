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
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

migrate = Migrate(app, db)
db.init_app(app)
CORS(app)
api = Api(app)

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




if __name__=='__main__':
    app.run(port=5555, debug=True)