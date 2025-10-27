import { Request,response, NextFunction } from "express";
import { authors, Author } from "../model/authors.js";

export function getAllAuthors(_req: Request, res: typeof response, _next: NextFunction) {
  res.json(authors);
}
export function getAuthorById(req: Request, res: typeof response, _next: NextFunction) {
  const id = Number(req.params.id);
  const author = authors.find((a) => a.id === id);  
    if (author) {   


    res.json(author);  }
    else {
    res.status(404).json({ error: "Author not found" });
    }
}

export function createAuthor(req: Request, res: typeof response, _next: NextFunction) {     
    const { name} = req.body;
    const newAuthor: Author = {
        id: authors.length + 1,
        name,
    };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
}
export function updateAuthor(req: Request, res: typeof response, _next: NextFunction) {
    const id = Number(req.params.id);
    const author = authors.find((a) => a.id === id);
    if (author) {
        const { name } = req.body;
        author.name = name ?? author.name;
        res.json(author);
    } else {
        res.status(404).json({ error: "Author not found" });
    }
}
export function deleteAuthor(req: Request, res: typeof response, _next: NextFunction) {
    const id = Number(req.params.id);
    const index = authors.findIndex((a) => a.id === id);
    if (index !== -1) {
        authors.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Author not found" });
    }
}   


