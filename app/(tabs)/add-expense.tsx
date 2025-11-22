import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import { Expense } from "../types/Expense";
import { getExpenses, saveAllExpenses } from "../utils/storage";

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Rent",
    "Bills",
    "Entertainment",
    "Health",
    "Miscellaneous",
  ];

  const handleAddExpense = async () => {
    if (!amount) {
      Alert.alert("Error", "Amount is required.");
      return;
    }

    const newExpense: Expense = {
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    };

    // ⭐ Load existing expenses
    const oldExpenses = await getExpenses();

    // ⭐ Append new one
    const updated = [...oldExpenses, newExpense];

    // ⭐ Save back safely
    await saveAllExpenses(updated);

    Alert.alert("Success", "Expense added!");

    // Reset fields
    setAmount("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Expense</Text>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          {categories.map((cat) => (
            <Picker.Item label={cat} value={cat} key={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F7FA",
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },

  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "#555",
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  pickerBox: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 15,
  },
});
