import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import { Expense } from "./types/Expense";
import { deleteExpense, getExpenses, saveAllExpenses } from "./utils/storage";

export default function EditExpense() {
  const { index } = useLocalSearchParams();
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadExpense();
  }, []);

  const loadExpense = async () => {
    const expenses = await getExpenses();
    const idx = Number(index);

    if (!expenses[idx]) {
      Alert.alert("Error", "Expense not found!");
      router.back();
      return;
    }

    const e: Expense = expenses[idx];

    setAmount(e.amount.toString());
    setCategory(e.category);
    setDescription(e.description ?? "");
  };

  const handleSave = async () => {
    const expenses = await getExpenses();
    const idx = Number(index);

    expenses[idx] = {
      amount: Number(amount),
      category,
      description,
      date: expenses[idx].date, // keep original date
    };

    await saveAllExpenses(expenses);

    Alert.alert("Saved!", "Expense updated successfully.");
    router.back();
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await deleteExpense(Number(index));
            if (success) {
              Alert.alert("Deleted", "Expense has been removed.");
              router.back();
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Expense</Text>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Save Changes" onPress={handleSave} />

      <View style={{ marginTop: 20 }}>
        <Button title="Delete Expense" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  label: { marginTop: 10, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
