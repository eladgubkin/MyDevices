from gino.ext.sanic import Gino
import json
from datetime import datetime
db = Gino()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(), nullable=False, primary_key=True)
    email = db.Column(db.String(), nullable=False)
    username = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    image_file = db.Column(db.String(), nullable=False, default='default.jpg')
    created_at = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f'''{{
    "id": "{self.id}",
    "email:" "{self.email}",
    "username:" "{self.username}",
    "password:" "{self.password}",
    "image_file:" "{self.image_file}",
    "created_at:" "{self.created_at}"
}}'''


class Computer(db.Model):
    __tablename__ = 'computers'

    name = db.Column(db.String(), nullable=False)
    ip = db.Column(db.String(), nullable=False)
    ping = db.Column(db.Integer(), nullable=False)
    mac = db.Column(db.String(), nullable=False, unique=True, primary_key=True)
    location = db.Column(db.String(), nullable=False)
    uptime = db.Column(db.String(), nullable=False)
    download = db.Column(db.String(), nullable=False)
    upload = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'''{{
    "name": "{self.name}",
    "ip": "{self.ip}",
    "ping": "{self.ping}",
    "mac": "{self.mac}",
    "location": "{self.location}",
    "uptime": "{self.uptime}",
    "download": "{self.download}",
    "upload": "{self.upload}"
}}'''


class Ping(db.Model):
    __tablename__ = 'pings'

    ip = db.Column(db.String(), nullable=False, primary_key=True)
    ping = db.Column(db.Integer(), nullable=False)
    date = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f'''{{
    "ip": "{self.ip}",
    "ping:" "{self.ping}",
    "date:" "{self.date}"
}}'''


class Speed(db.Model):
    __tablename__ = 'speeds'

    ip = db.Column(db.String(), nullable=False, primary_key=True)
    download = db.Column(db.String(), nullable=False)
    upload = db.Column(db.String(), nullable=False)
    date = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f'''{{
    "ip": "{self.ip}",
    "download:" "{self.download}",
    "upload:" "{self.upload}",
    "date:" "{self.date}"
}}'''
