from cnc.command import CommandType
from cnc.transfer_command import TransferCommand, TransferCommandAnswer
from cnc.get_agents_command import GetAgentsCommand, GetAgentsCommandAnswer
from cnc.ping_command import PingCommand, PingCommandAnswer
from cnc.tcp_scan_command import TcpScanCommand, TcpScanCommandAnswer
from cnc.snmp_scan_command import SNMPScanCommand, SNMPScanCommandAnswer

COMMANDS = {
    CommandType.TRANSFER: (TransferCommand, TransferCommandAnswer),
    CommandType.GET_AGENTS: (GetAgentsCommand, GetAgentsCommandAnswer),
    CommandType.PING: (PingCommand, PingCommandAnswer),
    CommandType.TCP_SCAN: (TcpScanCommand, TcpScanCommandAnswer),
    CommandType.SNMP_SCAN: (SNMPScanCommand, SNMPScanCommandAnswer),
}

class CommandFactory(object):
    def deserialize(self, data):
        return COMMANDS[CommandType(data['type'])][0].deserialize(data)

class CommandAnswerFactory(object):
    def deserialize(self, data):
        return COMMANDS[CommandType(data['type'])][1].deserialize(data)