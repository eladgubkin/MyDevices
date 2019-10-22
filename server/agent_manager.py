class AgentManager(object):
    def __init__(self):
        self.agents = {}

    def get_all_agents(self):
        return self.agents.keys()

    def get_agent(self, agent_id):
        return self.agents[agent_id]

    def add_agent(self, agent):
        self.agents[agent.id] = agent

    def remove_agent(self, agent):
        if agent.id in self.agents:
            del self.agents[agent.id]
