# new-nodejs

A small Express API with user registration, login and JWT-protected deposits, built test-first (TDD) with Node's built-in test runner and Supertest.

Data is kept in memory (`Map`s in `data/`), so everything resets when the server restarts.



# note to self (github should be milestones for coding)
created the backend using no resources or anything except looking through documentation (public google) **and no AI except to create this .md file but that doesnt count** **yay** (absolute caveman coding just pure coding)

coded 9 - 7 o clock no breaks at all just lunch
didnt know a single line of js or nodejs before but manage to learn it fluently within a week!!
## Requirements

- Node.js 20.6+ (for `--env-file` support)

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
JWT_KEY=your-secret-key
```

`JWT_KEY` is required — tokens can't be signed or verified without it.

## Running

```bash
npm start      # start the server
npm run dev    # start with auto-restart on file changes
npm test       # run the test suite
```

In VS Code, use the **Debug server** or **Debug tests** configurations in the Run and Debug tab; both load `.env` automatically.

## API

Base URL: `http://localhost:3000`

| Method | Path                     | Auth | Body                       | Returns              |
| ------ | ------------------------ | ---- | -------------------------- | -------------------- |
| POST   | `/register`              | No   | `{ username, password }`   | `201` + JWT          |
| POST   | `/login`                 | No   | `{ username, password }`   | `200` + JWT          |
| POST   | `/userFunction/deposit`  | Yes  | `{ amount }`               | `200` on success     |

Protected routes expect the token in the `Authorization` header:

```http
POST /userFunction/deposit
Authorization: <token>
Content-Type: application/json

{ "amount": 100 }
```

Tokens expire after 1 hour.

Example requests for every endpoint are in [`test.rest`](test.rest) (use the VS Code REST Client extension).

## Project structure

```
src/
  app.js            builds the Express app (routes + middleware), imported by tests
  server.js         starts the app on PORT
routes/
  register.js       POST /register
  login.js          POST /login
  userFunctions.js  POST /userFunction/deposit
middleware/
  authMiddleware.js verifies the JWT on protected routes
data/               in-memory stores (users, balances)
server.test.js      integration tests
test.rest           manual HTTP requests
```
