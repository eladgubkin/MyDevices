import pythonping
from multiprocessing import Pool
from cnc.command import Command, CommandType, CommandAnswer
from cnc.settings import DEFAULT_POOL_PROCSESES
from cnc.models import db, Computer
import json
import asyncpg

class DeleteComputersCommand(Command):
    def __init__(self, command_id, computers):
        super(DeleteComputersCommand, self).__init__(command_id)
        self.computers = computers

    async def execute(self, agent_manager):
        computers = json.loads(self.computers)
        await db.gino.create_all()
        
        for computer in computers:
          existing_computer = await Computer.get(computer['mac'])
          await existing_computer.delete()

        return DeleteComputersCommandAnswer(self.command_id)

    def serialize(self):
        return {
            'commandId': self.command_id,
            'type': CommandType.SAVE_COMPUTERS.value,
            'computers': self.computers
        }

    @staticmethod
    def deserialize(data):
        return DeleteComputersCommand(command_id=data['commandId'],
                                    computers=data['computers'])


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