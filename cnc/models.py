from gino.ext.sanic import Gino
import json

db = Gino()

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
