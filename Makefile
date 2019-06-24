USER_ID :=		$(shell id -u)
USER_GROUP_ID :=	$(shell id -g)
NODE_VERSION :=		lts-alpine
DOCKER_CMD :=		docker run
DOCKER_NODE_IMG :=	node:$(NODE_VERSION)
DOCKER_ARGS := 		-it \
	     		--init \
	       		--rm \
			-u "$(USER_ID)":"$(USER_GROUP_ID)" \
			-v "$(PWD)":/app \
			-w /app

install:
	$(DOCKER_CMD) $(DOCKER_ARGS) $(DOCKER_NODE_IMG) npm i
test: install
	$(DOCKER_CMD) $(DOCKER_ARGS) $(DOCKER_NODE_IMG) npx jest
docs:
	$(DOCKER_CMD) $(DOCKER_ARGS) -p 6060:6060 $(DOCKER_NODE_IMG) npx styleguidist server
