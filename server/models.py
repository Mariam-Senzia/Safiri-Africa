from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# user has many destinations & likes
# destinations have one media & many likes

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.Text)
    description = db.Column(db.String)
    profile_url = db.Column(db.String)
    country = db.Column(db.String)
    city = db.Column(db.String)

    destinations = db.relationship('Destination', backref='user')
    all_likes = db.relationship('Like', backref='user') 
    all_comments = db.relationship('Comment', backref='user')


class Destination(db.Model):
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    username = db.Column(db.String)
    title = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    region = db.Column(db.String, nullable=False)

    all_images = db.relationship('Media', backref='destination')
    all_likes = db.relationship('Like', backref='destination')
    all_comments = db.relationship('Comment', backref='destination')


class Media(db.Model):
    __tablename__ = 'medias'

    id = db.Column(db.Integer, primary_key=True)
    media_url = db.Column(db.String, nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'), nullable=False)


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))
    number_of_likes = db.Column(db.Integer, default=0)


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))
    username = db.Column(db.String)
    comment_text = db.Column(db.String)
