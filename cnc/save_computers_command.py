import pythonping
from multiprocessing import Pool
from cnc.command import Command, CommandType, CommandAnswer
from cnc.settings import DEFAULT_POOL_PROCSESES


class SaveComputersCommand(Command):
    def __init__(self, command_id, computers):
        super(SaveComputersCommand, self).__init__(command_id)
        self.computers = computers

    async def execute(self, agent_manager):
        with open(r'computers.db', 'w') as computers_db:
            computers_db.write(self.computers)

        return SaveComputersCommandAnswer(self.command_id)

    def serialize(self):
        return {
            'commandId': self.command_id,
            'type': CommandType.SAVE_COMPUTERS.value,
            'computers': self.computers
        }

    @staticmethod
    def deserialize(data):
        return SaveComputersCommand(command_id=data['commandId'],
                                    computers=data['computers'])


class SaveComputersCommandAnswer(CommandAnswer):
    def __init__(self, command_id):
        super(SaveComputersCommandAnswer, self).__init__(command_id) 

    def serialize(self):
        return dict({
            'commandId': self.command_id,
            'type': CommandType.SAVE_COMPUTERS.value,
        })

    @staticmethod
    def deserialize(data):
        return SaveComputersCommandAnswer(data['commandId'])