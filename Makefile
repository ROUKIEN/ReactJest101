USER_ID=$(shell id -u)
USER_GROUP_ID=$(shell id -g)
NODE_VERSION=lts-alpine
DOCKER_NODE_IMG=node:$(NODE_VERSION)
DOCKER_CMD=docker run -it --init --rm -u "$(USER_ID)":"$(USER_GROUP_ID)" -v "$(PWD)":/app -w /app $(DOCKER_NODE_IMG)

install:
	$(DOCKER_CMD) npm i
test: install
	$(DOCKER_CMD) npx jest
