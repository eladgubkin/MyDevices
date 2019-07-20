from gino.ext.sanic import Gino

db = Gino()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.Unicode(), nullable=False)
    password = db.Column(db.String(), nullable=False)