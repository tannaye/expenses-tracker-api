import express from "express";
import isAuth from "../../middleware/isAuth.js";

import ExpenseController from "../../../controllers/user/expenseController.js";

const router = express.Router();

router.post("/category", isAuth, async (req, res, next) => {
  const createCategory = await ExpenseController.createCategory(
    req.body,
    req.currentUser._id
  );

  return res.status(createCategory.code).json(createCategory);
});

router.delete("/category", isAuth, async (req, res, next) => {
  const deleteCategory = await ExpenseController.deleteCategory(
    req.currentUser._id
  );

  return res.status(deleteCategory.code).json(deleteCategory);
});

router.get("/categories", isAuth, async (req, res, next) => {
  const categories = await ExpenseController.getCategories(req.currentUser._id);

  return res.status(categories.code).json(categories);
});

router.post("/", isAuth, async (req, res, next) => {
  const expense = await ExpenseController.createExpense(
    req.body,
    req.currentUser._id
  );

  return res.status(expense.code).json(expense);
});

router.get("/", isAuth, async (req, res, next) => {
  const expenses = await ExpenseController.getExpenses(
    req.query,
    req.currentUser._id
  );

  return res.status(expenses.code).json(expenses);
});

export default router;
