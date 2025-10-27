import { Router } from "express";
import authorRouter from "./routes/authorRoute";
//import health from "./health.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({message: "Welcome to Library API" });
});

router.use("/author", authorRouter);

export default router;
