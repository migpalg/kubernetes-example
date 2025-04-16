import express, { Router } from "express";

async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const router = Router()
    .get("/", (req, res) => {
      res.json([
        { id: 1, title: "Todo 1", completed: false },
        { id: 2, title: "Todo 2", completed: true },
      ]);
    })
    .get("/:id", (req, res) => {
      const todoId = parseInt(req.params.id, 10);
      res.json({ id: todoId, title: `Todo ${todoId}`, completed: false });
    });

  app.use("/todos", router);

  app.listen(3000, () => {
    console.log("Todo Service is running on port 3000");
  });
}

main().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
