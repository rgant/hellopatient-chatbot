# Running the Application

## Development Setup

Use the correct versions of Python and Node:

```sh
brew install nvm pyenv
pyenv local # From .python-version
nvm use # From .nvmrc
```

> [!WARNING]
> [Python 3.13](./backend/docs/python-3.13-install-issues.md) is not supported
> by Poetry 2.1.1 and Pydantic 2.14.6.

Install Poetry:

```sh
brew install pipx
pipx install poetry
```

> [!WARNING]
> This project was setup using poetry version 1, and the latest version is 2.
> There were some changes to the `pyptoject.toml` file to support the new version.

Docker and Docker Compose:

Docker Desktop of Mac [installation instructions](https://docs.docker.com/desktop/setup/install/mac-install/).

PostgreSQL `libpq` header files are also required (e.g. `apt install libpq-dev`
on Ubuntu, `brew install postgresql` on macOS)

### First-Time Setup

1. `cd` into `backend` and run `poetry install`.
2. `cd` into `frontend` and run `npm ci`.

### Running the Development Servers

1. From the root directory, run `docker compose up`.
2. In a separate terminal, `cd` into `backend` and run
   `poetry run uvicorn server.main:app --reload`.
3. In a separate terminal, `cd` into `frontend` and run `npm run dev`.

### MacOS Development

For convenience I have created a `Makefile` to bundles these steps into single
commands.

`make install` to install both the frontend and backend dependencies.

`make database` to launch Docker.app and run the PostgreSQL database

`make backend` to run the FastAPI server

`make frontend` to run the Next.js server
