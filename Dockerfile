FROM node:23-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=todo-service --prod /prod/todo-service
RUN pnpm deploy --filter=users-service --prod /prod/users-service

FROM base AS todo-service
COPY --from=build /prod/todo-service /prod/todo-service
WORKDIR /prod/todo-service
EXPOSE 3000
CMD [ "node", "src/main" ]

FROM base AS users-service
COPY --from=build /prod/users-service /prod/users-service
WORKDIR /prod/users-service
EXPOSE 8001
CMD [ "node", "src/main" ]
