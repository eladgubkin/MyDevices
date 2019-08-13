import asyncio
from cnc.models import db
# import bcrypt

async def connect_to_db():
    await db.set_bind('postgresql://postgres:123456@localhost/mydevices')
    await db.gino.create_all()

    # await User.create(username='elad', password=
    #     bcrypt.hashpw('123456'.encode('utf-8'), bcrypt.gensalt()).decode('ascii'))


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(connect_to_db())
