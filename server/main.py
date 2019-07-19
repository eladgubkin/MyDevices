import asyncio
from sanic import Sanic
from sanic.response import html
from json import loads as json_load, dumps as json_dump
from cnc.ping_command import PingCommand
from cnc.command_factory import CommandFactory, CommandAnswerFactory
from server.agent import Agent
from server.agent_manager import AgentManager

app = Sanic()

agent_manager = AgentManager()

@app.websocket('/web')
async def web_handler(request, ws):
    agent = Agent(ws)
    # agent_manager.add_agent(agent)

    print('Connected')

    try:
        await agent.send({ 'agentId': agent.id })

        while True:
            command = CommandFactory().deserialize(await agent.receive())
            answer = await command.execute(agent_manager)

            await agent.send(answer.serialize())
    finally:
        agent_manager.remove_agent(agent)


@app.websocket('/agent')
async def agent_handler(request, ws):
    agent = Agent(ws)
    agent_manager.add_agent(agent)

    try:
        await agent.send({ 'agentId': agent.id })

        while True:
            await asyncio.sleep(1)
    finally:
        agent_manager.remove_agent(agent)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
