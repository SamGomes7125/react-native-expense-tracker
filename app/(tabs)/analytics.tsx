import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Expense } from "../types/Expense";
import { getExpenses } from "../utils/storage";

export default function AnalyticsScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = (await getExpenses()) as Expense[];
    setExpenses(data);
  };

  // -------- Group by Category --------
  const categoryTotals: Record<string, number> = {};

  expenses.forEach((item) => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) + item.amount;
  });

  // -------- Pie Chart Data --------
  const pieData = Object.keys(categoryTotals).map((key, index) => ({
    name: key,
    amount: categoryTotals[key],
    color: chartColors[index % chartColors.length],
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  // -------- Bar Chart Data --------
  const barLabels = expenses.map((e) => new Date(e.date).toLocaleDateString());
  const barValues = expenses.map((e) => e.amount);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytics</Text>

      {expenses.length === 0 ? (
        <Text style={styles.noData}>No expense data available</Text>
      ) : (
        <>
          {/* Pie Chart */}
          <Text style={styles.chartTitle}>Spending by Category</Text>
          <PieChart
            data={pieData}
            width={Dimensions.get("window").width - 30}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="10"
          />

          {/* Bar Chart */}
          <Text style={styles.chartTitle}>Each Expense Amount</Text>
          <BarChart
            data={{
              labels: barLabels,
              datasets: [{ data: barValues }],
            }}
            width={Dimensions.get("window").width - 30}
            height={260}
            chartConfig={chartConfig}
            verticalLabelRotation={45}
            fromZero={true}
            yAxisLabel="$"
            yAxisSuffix=""
          />
        </>
      )}
    </ScrollView>
  );
}

// -------- Colors for charts --------
const chartColors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

// -------- Chart Config --------
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
};

// -------- Styles --------
const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  chartTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  noData: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#777" },
});
