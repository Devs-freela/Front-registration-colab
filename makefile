# Commands by Docker
build:
	docker compose build --no-cache 
	docker compose up -d --build 
	docker logs registration-frontend -f

.PHONY: build

deploy:
	git pull
	docker compose build --no-cache
	docker compose up -d --build 
	docker logs registration-frontend -f

.PHONY: deploy

up:
	docker compose up -d 

.PHONY: up

down: 
	docker compose down

.PHONY: down

logs:
	docker logs registration-frontend -f

.PHONY: logs

# Commands by PM2
build-pm2:
	yarn
	yarn build
	pm2 start dist/main.js -f --name registration-frontend

.PHONY: build-pm2

logs-pm2:
	pm2 logs registration-frontend

.PHONY: logs-pm2