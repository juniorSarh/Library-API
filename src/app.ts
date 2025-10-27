import { Router } from "express";
import authorRouter from "./routes/authorRoute";
import bookRouter from "./routes/bookRoute";


const router = Router();

router.get("/", (_req, res) => {
  res.json({message: "Welcome to Library API" });
});

// This is where we add the routes to the main router
router.use("/author", authorRouter); //getting author routes
router.use("/book", bookRouter); //getting book routes
export default router;
