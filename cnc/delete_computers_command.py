import pythonping
from multiprocessing import Pool
from cnc.command import Command, CommandType, CommandAnswer
from cnc.settings import DEFAULT_POOL_PROCSESES
from cnc.models import db, Computer
import json
import asyncpg

class DeleteComputersCommand(Command):
    def __init__(self, command_id, macs):
        super(DeleteComputersCommand, self).__init__(command_id)
        self.macs = macs

    async def execute(self, agent_manager):
        macs = json.loads(self.macs)
        await db.gino.create_all()
        
        for mac in macs:
            existing_computer = await Computer.get(mac)
            await existing_computer.delete()
            print(mac + ' Deleted')

        return DeleteComputersCommandAnswer(self.command_id)

    def serialize(self):
        return {
            'commandId': self.command_id,
            'type': CommandType.SAVE_COMPUTERS.value,
            'macs': self.macs
        }

    @staticmethod
    def deserialize(data):
        return DeleteComputersCommand(command_id=data['commandId'],
                                    macs=data['computers'])


class DeleteComputersCommandAnswer(CommandAnswer):
    def __init__(self, command_id):
        super(DeleteComputersCommandAnswer, self).__init__(command_id) 

    def serialize(self):
        return dict({
            'commandId': self.command_id,
            'type': CommandType.SAVE_COMPUTERS.value,
        })

    @staticmethod
    def deserialize(data):
        return DeleteComputersCommandAnswer(data['commandId'])