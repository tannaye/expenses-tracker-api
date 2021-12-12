//models
import User from "../../models/user.js";
import Category from "../../models/category.js";
import Expense from "../../models/expense.js";

import { logger } from "../../helpers/logger.js";

export async function createCategory(data, user_id) {
  logger.debug("creating a category...");
  try {
    let category = await Category.create({
      title: data.title,
      user: user_id,
    });

    return {
      code: 200,
      status: "success",
      error: false,
      message: "category created successfully",
      data: category,
    };
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return {
      code: 500,
      status: "failed",
      error: true,
      message: "something went wrong, could not create a category",
    };
  }
}

export async function deleteCategory(category_id) {
  logger.debug("deleting a category...");
  try {
    let category = await Category.findByIdAndDelete(category_id);

    return {
      code: 200,
      status: "success",
      error: false,
      message: "category deleted successfully",
      data: category,
    };
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return {
      code: 500,
      status: "failed",
      error: true,
      message: "something went wrong, could not delete a category",
    };
  }
}

export async function getCategories(user_id) {
  logger.debug("getting all categories...");
  try {
    let category = await Category.find({
      user: user_id,
    });

    return {
      code: 200,
      status: "success",
      error: false,
      message: "categories retrieved successfully",
      data: category,
    };
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return {
      code: 500,
      status: "failed",
      error: true,
      message: "something went wrong, could not get all categories",
    };
  }
}

//create expenses
export async function createExpense(data, user_id) {
  logger.debug("creating an expense...");
  try {
    let expense = await Expense.create({
      user: user_id,
      category: data.category_id,
      amount: data.amount,
      note: data.note,
    });

    return {
      code: 200,
      status: "success",
      error: false,
      message: "expense created successfully",
      data: expense,
    };
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return {
      code: 500,
      status: "failed",
      error: true,
      message: "something went wrong, could not create an expense",
    };
  }
}

//get expense
export async function getExpenses(query, user_id) {
  logger.debug("getting expenses...");
  try {
    let expenses = await Expense.find({ user: user_id });

    if (query.category_id) {
      expenses = await Expense.find({
        user: user_id,
        category: query.category_id,
      });
    }

    return {
      code: 200,
      status: "success",
      error: false,
      message: "expense retrieved successfully",
      data: expenses,
    };
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return {
      code: 500,
      status: "failed",
      error: true,
      message: "something went wrong, could not get expenses",
    };
  }
}

const ExpenseController = {
  createCategory,
  deleteCategory,
  getCategories,
  createExpense,
  getExpenses,
};

export default ExpenseController;
