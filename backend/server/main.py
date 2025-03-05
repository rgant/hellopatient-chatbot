from datetime import datetime
import uuid

from fastapi import FastAPI, HTTPException
from fastapi import status as http_status_codes
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from .seed import seed_user_if_needed
from .db_engine import engine
from .models import Message, User

seed_user_if_needed()

app = FastAPI()


class MessageCreate(BaseModel):
    message: str


class MessageRead(BaseModel):
    id: uuid.UUID
    message: str
    sent_at: datetime


class UserRead(BaseModel):
    id: int
    name: str


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
                MessageRead(id=msg.id, message=msg.message, sent_at=msg.sent_at)
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
            await session.flush()

            return MessageRead(id=message.id, message=message.message, sent_at=message.sent_at)
