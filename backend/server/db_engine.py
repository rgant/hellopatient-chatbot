"""Configure database connections"""
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine

from .models import Base

_MAIN_URI = "postgres:postgres@localhost:5432/postgres"
_SYNC_URI = f"postgresql://{_MAIN_URI}"
_ASYNC_URI = f"postgresql+asyncpg://{_MAIN_URI}"

sync_engine = create_engine(_SYNC_URI)

Base.metadata.create_all(sync_engine)

engine = create_async_engine(_ASYNC_URI)
