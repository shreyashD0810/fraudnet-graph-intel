import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockTransactionData } from "@/lib/mockData";

const DataEDA = () => {
  const fraudData = [
    { name: "Legitimate", value: 837, color: "hsl(var(--success))" },
    { name: "Fraudulent", value: 163, color: "hsl(var(--destructive))" },
  ];

  const amountDistribution = [
    { range: "$0-100", legitimate: 320, fraud: 45 },
    { range: "$100-500", legitimate: 280, fraud: 38 },
    { range: "$500-1000", legitimate: 150, fraud: 25 },
    { range: "$1000-5000", legitimate: 70, fraud: 35 },
    { range: "$5000+", legitimate: 17, fraud: 20 },
  ];

  const deviceTypes = [
    { device: "Windows", count: 350 },
    { device: "MacOS", count: 280 },
    { device: "Android", count: 220 },
    { device: "iOS", count: 150 },
  ];

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Data & Exploratory Analysis</h1>
        <p className="text-muted-foreground">
          Interactive visualizations of transaction patterns and fraud indicators
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Fraud Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Transaction Distribution</CardTitle>
            <CardDescription>Fraud vs Legitimate transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fraudData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fraudData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Amount Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Transaction Amount Distribution</CardTitle>
            <CardDescription>By fraud status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={amountDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend />
                <Bar dataKey="legitimate" fill="hsl(var(--success))" name="Legitimate" />
                <Bar dataKey="fraud" fill="hsl(var(--destructive))" name="Fraud" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Type Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Device Type Analysis</CardTitle>
            <CardDescription>Transaction count by device</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceTypes} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="device" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
            <CardDescription>Automated pattern detection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <h4 className="font-semibold text-destructive mb-2">High-Risk Pattern</h4>
              <p className="text-sm text-muted-foreground">
                Fraudulent transactions show 3.2x higher average amounts ($4,850 vs $1,520)
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Device Correlation</h4>
              <p className="text-sm text-muted-foreground">
                85% of fraud cases involve shared devices across multiple cards
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Time Pattern</h4>
              <p className="text-sm text-muted-foreground">
                67% of fraudulent activity occurs between 10 PM - 4 AM
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataEDA;
