import express from "express";
import {
  createTransaction,
  deleteTransactions,
  getSummary,
  getTransactionsByUserId,
} from "../controller/transactionsController.js";

const router = express.Router();

//GET Method by userId
router.get("/:userId", getTransactionsByUserId);

//POST Method
router.post("/", createTransaction);

//DELETE Method
router.delete("/:id", deleteTransactions);

//GET Summary Method
router.get("/summary/:userId", getSummary);

export default router;
