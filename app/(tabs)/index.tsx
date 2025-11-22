import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getExpenses } from "../utils/storage";

import { Expense } from "../types/Expense";

export default function HomeScreen() {
  const [total, setTotal] = useState(0);
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState<number[]>(
    new Array(12).fill(0)
  );

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const expenses = (await getExpenses()) as Expense[];

    // --- Total spent ---
    const totalSpent = expenses.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );
    setTotal(totalSpent);

    // --- Current Month Total ---
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const monthTotal = expenses
      .filter((exp) => {
        const d = new Date(exp.date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
      })
      .reduce((acc, item) => acc + Number(item.amount), 0);

    setCurrentMonthTotal(monthTotal);

    // --- Monthly totals for chart ---
    const totalsByMonth = new Array(12).fill(0);

    expenses.forEach((exp) => {
      const d = new Date(exp.date);
      if (d.getFullYear() === thisYear) {
        totalsByMonth[d.getMonth()] += Number(exp.amount);
      }
    });

    setMonthlyTotals(totalsByMonth);
  };

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome back, Sam 👋</Text>

      {/* Total Spending */}
      <Text style={styles.sectionTitle}>Total Spent</Text>
      <Text style={styles.amount}>${total.toFixed(2)}</Text>

      {/* Current Month Spending */}
      <Text style={styles.sectionTitle}>
        This Month ({new Date().toLocaleString("default", { month: "long" })})
      </Text>
      <Text style={styles.monthAmount}>${currentMonthTotal.toFixed(2)}</Text>

      {/* Monthly Spending Chart */}
      <Text style={styles.sectionTitle}>Monthly Spending Overview</Text>
      <BarChart
        data={{
          labels: monthLabels,
          datasets: [{ data: monthlyTotals }],
        }}
        width={Dimensions.get("window").width - 20}
        height={280}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={chartConfig}
        fromZero={true}
        verticalLabelRotation={45}
        style={{ borderRadius: 10 }}
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    color: "#555",
  },

  amount: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 5,
    color: "#28A745",
  },

  // ⭐ FIXED — added this style
  monthAmount: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
    color: "#4A90E2",
  },
});
