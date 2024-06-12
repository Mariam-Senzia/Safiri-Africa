from models import User, Destination, Media, Like
from app import db, app

def seed():
    with app.app_context():
        db.drop_all()
        db.create_all()

        