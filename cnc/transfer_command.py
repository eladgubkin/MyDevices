import pythonping
from multiprocessing import Pool
from mydevices.cnc.command import Command, CommandType, CommandAnswer
from mydevices.cnc.settings import DEFAULT_POOL_PROCSESES


class TransferCommand(Command):
    def __init__(self, command_id, agent_id, command):
        super(TransferCommand, self).__init__(command_id)
        self.agent_id = agent_id
        self.command = command

    async def execute(self, agent_manager):
        from mydevices.cnc.command_factory import CommandAnswerFactory
        
        agent = agent_manager.get_agent(self.agent_id)
        await agent.send(self.command.serialize())

        return TransferCommandAnswer(self.command_id,
            CommandAnswerFactory().deserialize(await agent.receive()))

    def serialize(self):
        return {
            'commandId': self.command_id,
            'type': CommandType.TRANSFER.value,
            'agentId': self.agent_id,
            'command': self.command.serialize(),
        }

    @staticmethod
    def deserialize(data):
        from mydevices.cnc.command_factory import CommandFactory

        return TransferCommand(command_id=data['commandId'],
                               agent_id=data['agentId'], 
                               command=CommandFactory().deserialize(data['command']))


class TransferCommandAnswer(CommandAnswer):
    def __init__(self, command_id, command_answer):
        super(TransferCommandAnswer, self).__init__(command_id)
        self.command_answer = command_answer

    def serialize(self):
        return dict({
            'commandId': self.command_id,
            'type': CommandType.TRANSFER.value,
            'commandAnswer': self.command_answer.serialize(),
        })

    @staticmethod
    def deserialize(data):
        return TransferCommandAnswer(data['commandId'], data['commandAnswer'])