from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# user has many destinations & likes
# destinations have one media & many likes

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.Text)

    destinations = db.relationship('Destination', backref='user')
    all_likes = db.relationship('Like', backref='user_likes')

class Destination(db.Model):
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    region = db.Column(db.String, nullable=False)


    user_destination = db.relationship('User',backref='destinations_user')
    all_images = db.relationship('Media',backref='destination')
    all_likes = db.relationship('Like',backref='destination')


class Media(db.Model):
    __tablename__ = 'medias'

    id = db.Column(db.Integer, primary_key=True)
    media_url = db.Column(db.String, nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'),nullable = False)

    destination_media = db.relationship('Destination', backref='medias')


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))

    user_like = db.relationship('User', backref='user_likes')
    destination_like = db.relationship('Destination', backref='destination_like')

