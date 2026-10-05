# sync-engine-reservations

A small reservations app built with [sync-engine](https://github.com/mit-sdg/sync-engine). It has a backend on Bun, a frontend in plain HTML, CSS, and TypeScript, and MongoDB. Guests reserve a table under their name, and the app refuses a second reservation for the same table.

This is the finished app from 6.1040's guide, [Developing a sync-engine app locally](https://61040.github.io/fa26/resources/sync-engine-local-dev/). The guide builds it step by step and explains every file.

## Running it

You need [Bun](https://bun.com) 1.4 and Podman with Compose. The [MongoDB setup guide](https://61040.github.io/fa26/resources/mongodb-setup/) covers installing them.

```sh
bun install
cp .env.example .env
bun run dev
```

`bun run dev` starts MongoDB in a container, then the backend at http://127.0.0.1:3000 and the frontend at http://127.0.0.1:8080. Both reload when you save a file. Open http://127.0.0.1:8080 to use the app.

`bun run start` starts both servers without watching for changes, using the same addresses. Start MongoDB first with `bun run db:up`, or point `MONGODB_URL` in `.env` at an existing database.

To run all three in containers instead, the way the app runs once it's deployed, stop `bun run dev` and run:

```sh
bun run up
```

`bun run down` stops the containers, and `bun run db:reset` deletes the local data.

## What's where

| Path           | What it holds                                           |
| -------------- | ------------------------------------------------------- |
| `design/`      | The concept specification and the app's design          |
| `src/`         | The backend: the concept, the endpoints, and the server |
| `web/`         | The frontend: the page and the server that sends it     |
| `scripts/`     | Scripts that call the API from the terminal             |
| `generated/`   | Types and a summary that `bun run generate` writes      |
| `compose.yaml` | The MongoDB, backend, and frontend containers           |
| `Dockerfile`   | How the image for the backend and frontend is built     |

After changing anything in `design/` or an endpoint, run `bun run check:design`, `bun run generate`, and `bun run check`.
