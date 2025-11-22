import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Expense } from "../types/Expense";
import { getExpenses } from "../utils/storage";

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>All Expenses</Text>

      <FlatList
        data={expenses}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.push(`/edit-expense?index=${index}`)}
          >
            <View style={styles.card}>
              <Text style={styles.amount}>₹{item.amount}</Text>
              <Text>{item.category}</Text>
              <Text style={styles.small}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  amount: { fontSize: 18, fontWeight: "bold" },
  small: { color: "#777", marginTop: 5 },
});
