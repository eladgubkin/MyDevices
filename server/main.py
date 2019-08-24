import asyncio
from json import loads as json_load, dumps as json_dump
from cnc.ping_command import PingCommand
from cnc.command_factory import CommandFactory, CommandAnswerFactory
from server.agent import Agent
from server.agent_manager import AgentManager
from sanic import Sanic
from sanic.exceptions import abort
from sanic.response import json
from server.models import db
# from sanic_jwt import Initialize
# import bcrypt
# from sanic_jwt.decorators import protected, inject_user

app = Sanic()
app.config.DB_HOST = 'localhost'
app.config.DB_DATABASE = 'mydevices'
app.config.DB_USER = 'postgres'
app.config.DB_PASSWORD = '123456'
db.init_app(app)

agent_manager = AgentManager()

# from sanic_jwt import exceptions

# async def authenticate(request, *args, **kwargs):
#     username = request.json.get("username", None)
#     password = request.json.get("password", None)

#     if not username or not password:
#         raise exceptions.AuthenticationFailed("Missing username or password.")

#     user = await User.query.where(User.username == username).gino.first()
#     if user is None or not bcrypt.checkpw(password.encode('utf-8'), bytes(user.password, 'ascii')):
#         raise exceptions.AuthenticationFailed("Authentication failed.")

#     return { 'user_id': user.id }


# async def retrieve_user(request, payload, *args, **kwargs):
#     if not payload:
#         return None

#     user_id = payload.get('user_id', None)
#     return await User.get(user_id)

# Initialize(app, authenticate=authenticate, retrieve_user=retrieve_user, query_string_set=True)


# @app.route("/test")
# @protected()
# @inject_user()
# async def test(request, user):
#     return json({"user": user.username})

async def connect_to_db():
    await db.set_bind('postgresql://postgres:123456@localhost/mydevices')
    await db.gino.create_all()
    # await User.create(username='elad', password=
    #     bcrypt.hashpw('123456'.encode('utf-8'), bcrypt.gensalt()).decode('ascii'))
    
    
@app.websocket('/web')
# @protected()
# @inject_user()
async def web_handler(request, ws):
    agent = Agent(ws)
    # agent_manager.add_agent(agent)

    print('Connected')

    try:
        await agent.send({ 'agentId': agent.id })

        while True:
            command = CommandFactory().deserialize(await agent.receive())
            answer = await command.execute(agent_manager)
            if answer is None:
                print('WARNING: answer is none')
            else:
                await agent.send(answer.serialize())
    finally:
        agent_manager.remove_agent(agent)


@app.websocket('/agent')
# @protected()
# @inject_user()
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
    asyncio.get_event_loop().run_until_complete(connect_to_db())