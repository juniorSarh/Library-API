<img src="https://socialify.git.ci/juniorSarh/Library-API/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Library-API" width="640" height="320" />

# Library System API
TypeScript + Express REST API for managing Authors and Books.
## Quick Start
- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Start built app: `npm start`
Server runs on `http://localhost:3000` by default.
## Tech Stack
- Node.js, Express, TypeScript
- In-memory data store (no external DB)
## Project Structure
```
src/
  app.ts
  server.ts
  middleware/
    errorHandler.ts
    validate.ts
  models/
    author.ts
    book.ts
  routes/
    authorsRoutes.ts
    booksRoutes.ts
  controllers/
    authorController.ts
    bookController.ts
  ```
## Endpoints
### Authors
- POST `/authors`
  - Body: `{ "name": string }`
  - 201 Created → Author
- GET `/authors`
  - 200 OK → Author[]
- GET `/authors/:id`
  - 200 OK → Author
  - 404 Not Found
- PUT `/authors/:id`
  - Body: `{ "name": string, "bio"?: string }`
  - 200 OK → Author
  - 400 Bad Request | 404 Not Found
- DELETE `/authors/:id`
  - 204 No Content | 404 Not Found
- GET `/authors/:id/books`
  - Lists books for the author. Supports filters/sort/pagination (see below).
  - 200 OK → `{ data: Book[]}`
### Books
- POST `/books`
  - Body: `{ "title": string, "year"?: number, "authorId": number}`
  - 201 Created → Book
  - 400 Bad Request | 404 Not Found (invalid author) | 409 Conflict (duplicate title for author)
- GET `/books`
  - Supports filters/sort/pagination (see below).
  - 200 OK → `{ data: Book[] }`
- GET `/books/:id`
  - 200 OK → Book | 404 Not Found
- PUT `/books/:id`
  - Body: any subset of `{ "title": string, "year": number, "authorId": number, "isbn": string }`
  - 200 OK → Book
  - 400 Bad Request | 404 Not Found | 409 Conflict (duplicate title for author)
- DELETE `/books/:id`
  - 204 No Content | 404 Not Found
## Filtering, Sorting, Pagination
Available on:
- `GET /books`
- `GET /authors/:id/books`
Query parameters:
- Filtering
  - `q` or `title`: substring match on title
  - `author`: substring match on author name (only for `/books`)
  - `year`: exact year
  - `yearMin`, `yearMax`: inclusive range
- Sorting
  - `sortBy`: one of `id`, `title`, `year`
  - `sortOrder`: `asc` (default) or `desc`
- Pagination
  - `page`: default `1`
  - `pageSize`: default `10`, max `100`
Example:
```
GET /books?q=stone&author=rowling&yearMin=1990&yearMax=2000&sortBy=year&sortOrder=desc&page=1&pageSize=5
```
Response shape for list endpoints:
```json
{
  "data": [ /* items */ ],
  "meta": { "page": 1, "pageSize": 5, "total": 12, "totalPages": 3 }
}
```
## Validation
- Authors: `name` required, non-empty string. `bio` optional string.
- Books: `title` required, non-empty string. `authorId` required positive integer. `year` optional integer. `isbn` optional string.
## Error Handling
Centralized error responses:
- 400 Bad Request: invalid input
- 404 Not Found: resource or route not found
- 409 Conflict: duplicate book title for the same author
- 500 Internal Server Error: unexpected errors
Error body format:
```json
{ "error": "Message" }
```
## Development Workflow
- Default branch: `main`
- Active development branch: `dev`
  - All new work lands on `dev` via commits/PRs
## Sample Requests
Create author:
```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Terry Pratchett"}'
```
Create book:
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Mort","year":1987,"authorId":3}'
```
List books with filters:
```bash
curl "http://localhost:3000/books?q=thrones&sortBy=year&sortOrder=asc&page=1&pageSize=5"
```
## Notes
- Data is in-memory; restarting the server resets data.
- Logger middleware prints method and URL for each request.
