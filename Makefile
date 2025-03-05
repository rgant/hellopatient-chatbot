.PHONY: install
install:
	cd backend; poetry install
	cd frontend; npm ci

.PHONY: database
database:
	osascript -e 'tell application "Terminal" to set background color of selected tab of the front window to {65452, 54493, 61744}' # pink
	open -a 'Docker.app'; sleep 2; docker compose up

.PHONY: backend
backend:
	osascript -e 'tell application "Terminal" to set background color of selected tab of the front window to {57825, 65021, 56540}' # green
	cd backend; poetry run uvicorn main:app --reload

.PHONY: frontend
frontend:
	osascript -e 'tell application "Terminal" to set background color of selected tab of the front window to {65535, 65232, 53533}' # yellow
	cd frontend; npm run dev
