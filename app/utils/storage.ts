import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../types/Expense";

const EXPENSE_KEY = "expenses";

export async function getExpenses(): Promise<Expense[]> {
  try {
    const data = await AsyncStorage.getItem(EXPENSE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading:", err);
    return [];
  }
}

export async function saveAllExpenses(expenses: Expense[]) {
  await AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
}

export async function updateExpenseAtIndex(index: number, expense: Expense) {
  const expenses = await getExpenses();
  expenses[index] = expense;
  await AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
}
export async function deleteExpense(index: number) {
  const existing = await getExpenses();
  existing.splice(index, 1);
  await saveAllExpenses(existing);
  return true;
}
