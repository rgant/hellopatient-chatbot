from datetime import datetime
import uuid

from pydantic import BaseModel

class MessageCreate(BaseModel):
    message: str


class ResponseRead(BaseModel):
    id: uuid.UUID
    response: str
    sent_at: datetime


class MessageRead(BaseModel):
    id: uuid.UUID
    message: str
    sent_at: datetime
    response: ResponseRead


class UserRead(BaseModel):
    id: int
    name: str
