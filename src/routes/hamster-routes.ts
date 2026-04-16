import express from "express";

const HamsterRouter = express.Router();

// GET /hamster/
HamsterRouter.get("/");

// POST /hamster/
HamsterRouter.post("/");

// PATCH /hamster/
HamsterRouter.patch("/");

// DELETE /hamster/
HamsterRouter.delete("/");

export default HamsterRouter;
