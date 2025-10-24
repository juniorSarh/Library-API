import { Router } from "express";
//import health from "./health.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ ok: true, message: "API is up" });
});

//router.use("/author", author);

export default router;
