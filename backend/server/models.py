from datetime import datetime
from typing import override
import uuid

from sqlalchemy import DateTime, ForeignKey, String, Uuid
from sqlalchemy import func
from sqlalchemy.orm import DeclarativeBase, Mapped
from sqlalchemy.orm import mapped_column, relationship


class Base(DeclarativeBase):
    pass


class User(Base):
    # WARNING! PostgreSQL owns the keyword "user", so SELECT * FROM user; shows the current user.
    # To manually query this table you need `SELECT * FROM "user"`
    __tablename__: str = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))

    messages: Mapped[list["Message"]] = relationship(back_populates="user", lazy="select")

    @override
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}"


class Message(Base):
    __tablename__: str = "message"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    message: Mapped[str] = mapped_column(String, nullable=False)
    sent_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())  # pylint: disable=not-callable; false positive

    user: Mapped[User] = relationship(back_populates="messages")

    @override
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, message={self.message!r}, user_id={self.user_id!r}"
