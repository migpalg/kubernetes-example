import express, { Router } from "express";

async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const router = Router()
    .get("/", (req, res) => {
      res.json([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" }
      ]);
    })
    .get("/:id", (req, res) => {
      const userId = parseInt(req.params.id, 10);
      res.json({ id: userId, name: `User ${userId}` });ƒ
    });

  app.use("/users", router);

  app.listen(3000, () => {
    console.log("Users Service is running on port 3000");
  });
}

main().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
