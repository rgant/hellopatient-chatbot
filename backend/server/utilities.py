import random

from .api_models import ResponseRead
from .db_models import Message, Response


def get_response(message: Message) -> Response:
    """Create a database Response object for a Message"""
    return Response(response=shuffle_words(message.message))


def read_response(response: Response) -> ResponseRead:
    """Convert database model to api read model for Responses."""
    return ResponseRead(id=response.id, response=response.response, sent_at=response.sent_at)


def shuffle_words(message: str) -> str:
    """Shuffle message"""
    words = message.split()
    random.shuffle(words)
    return " ".join(words)
