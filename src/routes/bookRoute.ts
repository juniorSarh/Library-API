
import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
updateBook,
    deleteBook,
} from "../controllers/booksController.js";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;