import pythonping
from multiprocessing import Pool
from cnc.command import Command, CommandType, CommandAnswer
from cnc.ip_utils import parse_network
from cnc.settings import DEFAULT_POOL_PROCSESES

def ping(ip):
    return (ip, pythonping.ping(ip, count=1).rtt_avg_ms)


class PingCommand(Command):
    def __init__(self, command_id, network):
        super(PingCommand, self).__init__(command_id)
        self.network = network

    async def execute(self, agent_manager):
        pool = Pool(DEFAULT_POOL_PROCSESES)
        return PingCommandAnswer(self.command_id, 
            dict(pool.map(ping, parse_network(self.network))))

    def serialize(self):
        return {
            'commandId': self.command_id,
            'type': CommandType.PING.value,
            'network': self.network,
        }

    @staticmethod
    def deserialize(data):
        return PingCommand(command_id=data['commandId'], network=data['network'])


class PingCommandAnswer(CommandAnswer):
    def __init__(self, command_id, result):
        super(PingCommandAnswer, self).__init__(command_id)
        self.result = result

    def serialize(self):
        return dict({
            'commandId': self.command_id,
            'type': CommandType.PING.value,
            'result': self.result
        })

    @staticmethod
    def deserialize(data):
        return PingCommandAnswer(data['commandId'], data['result'])