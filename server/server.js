import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Request received", req.method);
//   next();
// });

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

    console.log("Database Initialized successfully");
  } catch (error) {
    console.log("Error initializing database, Status Error:", error);
    process.exit(1); // Status 1 = Error, 0 = Success
  }
}

app.get("/", (req, res) => {
  res.send("Its Working!");
});

app.post("/api/transactions", async (req, res) => {
  // Title, amount, category, user_id
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || amount == undefined || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await sql`
        INSERT INTO transactions (user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category})
        RETURNING *`;

    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
});
