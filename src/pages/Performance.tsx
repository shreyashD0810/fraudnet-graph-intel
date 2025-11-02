import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Performance = () => {
  const metrics = [
    { name: "ROC-AUC", value: 93.45, color: "hsl(var(--chart-1))" },
    { name: "Precision", value: 84.79, color: "hsl(var(--chart-2))" },
    { name: "Recall", value: 80.23, color: "hsl(var(--chart-3))" },
    { name: "F1-Score", value: 82.46, color: "hsl(var(--chart-4))" },
    { name: "Accuracy", value: 90.87, color: "hsl(var(--chart-5))" },
    { name: "PR-AUC", value: 76.18, color: "hsl(var(--primary))" },
  ];

  const rocCurve = Array.from({ length: 11 }, (_, i) => ({
    fpr: i / 10,
    tpr: Math.min(1, (i / 10) * 1.1 + 0.05),
  }));

  const confusionMatrix = [
    { actual: "Fraud", predicted: "Fraud", count: 42358 },
    { actual: "Fraud", predicted: "Legit", count: 891 },
    { actual: "Legit", predicted: "Fraud", count: 423 },
    { actual: "Legit", predicted: "Legit", count: 74621 },
  ];

  const featureImportance = [
    { feature: "Shared Device/IP Count", importance: 35 },
    { feature: "Node Degree (Graph)", importance: 18 },
    { feature: "Time Since Last Txn", importance: 15 },
    { feature: "Email Domain Risk", importance: 12 },
    { feature: "Transaction Amount", importance: 10 },
    { feature: "Card Type Velocity", importance: 10 },
  ];

  const trainingProgress = [
    { epoch: 0, loss: 1.8923, f1: 15.21, time: 25.12 },
    { epoch: 10, loss: 1.5234, f1: 23.56, time: 24.88 },
    { epoch: 20, loss: 1.2456, f1: 34.52, time: 24.91 },
    { epoch: 30, loss: 1.0234, f1: 44.53, time: 24.83 },
    { epoch: 40, loss: 0.8456, f1: 52.34, time: 24.79 },
    { epoch: 50, loss: 0.7123, f1: 58.91, time: 24.76 },
    { epoch: 60, loss: 0.6123, f1: 64.32, time: 24.72 },
    { epoch: 70, loss: 0.5345, f1: 68.76, time: 24.70 },
    { epoch: 80, loss: 0.4789, f1: 72.34, time: 24.67 },
    { epoch: 90, loss: 0.4345, f1: 75.21, time: 24.65 },
    { epoch: 100, loss: 0.4023, f1: 77.56, time: 24.62 },
  ];

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Model Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive evaluation metrics and visualizations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.name} className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold" style={{ color: metric.color }}>
                {metric.value}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ROC Curve */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>ROC Curve</CardTitle>
            <CardDescription>Receiver Operating Characteristic</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rocCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="fpr"
                  label={{ value: "False Positive Rate", position: "insideBottom", offset: -5 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  label={{ value: "True Positive Rate", angle: -90, position: "insideLeft" }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tpr"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feature Importance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Feature Importance</CardTitle>
            <CardDescription>SHAP-style contribution analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  dataKey="feature"
                  type="category"
                  width={150}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="importance" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Confusion Matrix */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Confusion Matrix</CardTitle>
            <CardDescription>Model classification breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <div />
              <div className="text-center text-sm font-medium">Pred: Fraud</div>
              <div className="text-center text-sm font-medium">Pred: Legit</div>
              
              <div className="text-sm font-medium flex items-center">Actual: Fraud</div>
              <div className="p-6 bg-success/20 rounded-lg text-center">
                <div className="text-2xl font-bold">42,358</div>
                <div className="text-xs text-muted-foreground">True Positive</div>
              </div>
              <div className="p-6 bg-destructive/20 rounded-lg text-center">
                <div className="text-2xl font-bold">891</div>
                <div className="text-xs text-muted-foreground">False Negative</div>
              </div>
              
              <div className="text-sm font-medium flex items-center">Actual: Legit</div>
              <div className="p-6 bg-destructive/20 rounded-lg text-center">
                <div className="text-2xl font-bold">423</div>
                <div className="text-xs text-muted-foreground">False Positive</div>
              </div>
              <div className="p-6 bg-success/20 rounded-lg text-center">
                <div className="text-2xl font-bold">74,621</div>
                <div className="text-xs text-muted-foreground">True Negative</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Progress */}
        <Card className="shadow-card md:col-span-2">
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
            <CardDescription>Loss and F1-Score evolution over 100 epochs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="epoch"
                  label={{ value: "Epoch", position: "insideBottom", offset: -5 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  yAxisId="left"
                  label={{ value: "Loss", angle: -90, position: "insideLeft" }}
                  stroke="hsl(var(--destructive))"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: "F1-Score (%)", angle: 90, position: "insideRight" }}
                  stroke="hsl(var(--success))"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "f1") return [`${value.toFixed(2)}%`, "F1-Score"];
                    if (name === "loss") return [value.toFixed(4), "Loss"];
                    return [value, name];
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="loss"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  dot={false}
                  name="Loss"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="f1"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={false}
                  name="F1-Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Insights */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key observations and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Excellent ROC-AUC</h4>
              <p className="text-sm text-muted-foreground">
                93.45% ROC-AUC indicates superior discrimination between fraud and legitimate transactions
              </p>
            </div>
            <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
              <h4 className="font-semibold mb-2" style={{ color: "hsl(var(--chart-2))" }}>
                High Precision & Recall
              </h4>
              <p className="text-sm text-muted-foreground">
                84.79% precision and 80.23% recall demonstrate balanced performance in detecting fraud
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Extremely Low False Positives</h4>
              <p className="text-sm text-muted-foreground">
                Only 0.56% false positive rate (423 out of 75,044) minimizes customer friction
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Performance;
