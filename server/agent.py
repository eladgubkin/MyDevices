import json
import uuid
from mydevices.cnc.command_factory import CommandAnswerFactory


class Agent(object):
    def __init__(self, ws):
        self.id = str(uuid.uuid4())
        self.ws = ws
    
    async def send(self, data):
        await self.ws.send(json.dumps(data))

    async def receive(self):
        return json.loads(await self.ws.recv())