from sqlalchemy import select
from sqlalchemy.orm import Session

from .db_engine import sync_engine
from .models import Message, User


def seed_user_if_needed() -> None:
    """Initalize default user in database"""
    with Session(sync_engine) as session:
        with session.begin():
            if session.execute(select(User)).scalar_one_or_none() is not None:
                print("User already exists, skipping seeding")
                return
            print("Seeding user")
            user = User(name="Alice")
            test_message = Message(user_id=user.id, message="This is a test")
            user.messages.append(test_message)
            session.add(user)
            session.commit()
