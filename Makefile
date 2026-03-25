.PHONY: dev build test lint
dev:
	npm run dev
build:
	npm run build
test:
	npm run test
lint:
	npm run lint
docker-build:
	docker build -t rocket-shooter .
docker-run:
	docker run -p 3000:80 rocket-shooter
