from fastapi import FastAPI, HTTPException
from fastapi import status as http_status_codes
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from .api_models import MessageCreate, MessageRead, UserRead
from .db_engine import engine
from .db_models import Message, User
from .seed import seed_user_if_needed
from .utilities import get_response, read_response

seed_user_if_needed()

app = FastAPI()


@app.get("/users/me")
async def get_my_user() -> UserRead:
    """Fetch public user object for current user."""
    async with AsyncSession(engine) as session:
        async with session.begin():
            # Sample logic to simplify getting the current user. There's only one user.
            result = await session.execute(select(User))
            user = result.scalars().first()

            if user is None:
                raise HTTPException(status_code=404, detail="User not found")
            return UserRead(id=user.id, name=user.name)


@app.get("/messages/me")
async def get_my_messages() -> list[MessageRead]:
    """Fetch messages for current user."""
    async with AsyncSession(engine) as session:
        async with session.begin():
            # Sample logic to simplify getting the current user. There's only one user.
            result = await session.execute(select(User).options(joinedload(User.messages)))
            user = result.scalars().first()

            if user is None:
                raise HTTPException(status_code=404, detail="User not found")

            return [
                MessageRead(
                    id=msg.id,
                    message=msg.message,
                    sent_at=msg.sent_at,
                    response=read_response(msg.response),
                )
                for msg in user.messages
            ]


@app.post(
    "/messages/me", response_model=MessageRead, status_code=http_status_codes.HTTP_201_CREATED
)
async def add_my_message(message_payload: MessageCreate) -> MessageRead:
    """Create a new message from user."""
    async with AsyncSession(engine) as session:
        async with session.begin():
            result = await session.execute(select(User))
            user = result.scalars().first()

            if user is None:
                raise HTTPException(status_code=404, detail="User not found")

            message = Message(message=message_payload.message, user=user)
            session.add(message)

            message.response = get_response(message)

            await session.flush()

            return MessageRead(
                id=message.id,
                message=message.message,
                sent_at=message.sent_at,
                response=read_response(message.response),
            )
