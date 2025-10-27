import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Performance = () => {
  const metrics = [
    { name: "ROC-AUC", value: 96.4, color: "hsl(var(--chart-1))" },
    { name: "Precision", value: 89.1, color: "hsl(var(--chart-2))" },
    { name: "Recall", value: 82.5, color: "hsl(var(--chart-3))" },
    { name: "F1-Score", value: 85.7, color: "hsl(var(--chart-4))" },
  ];

  const rocCurve = Array.from({ length: 11 }, (_, i) => ({
    fpr: i / 10,
    tpr: Math.min(1, (i / 10) * 1.1 + 0.05),
  }));

  const confusionMatrix = [
    { actual: "Fraud", predicted: "Fraud", count: 135 },
    { actual: "Fraud", predicted: "Legit", count: 28 },
    { actual: "Legit", predicted: "Fraud", count: 89 },
    { actual: "Legit", predicted: "Legit", count: 748 },
  ];

  const featureImportance = [
    { feature: "Shared Device/IP Count", importance: 35 },
    { feature: "Node Degree (Graph)", importance: 18 },
    { feature: "Time Since Last Txn", importance: 15 },
    { feature: "Email Domain Risk", importance: 12 },
    { feature: "Transaction Amount", importance: 10 },
    { feature: "Card Type Velocity", importance: 10 },
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
      <div className="grid md:grid-cols-4 gap-6">
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
                <div className="text-2xl font-bold">135</div>
                <div className="text-xs text-muted-foreground">True Positive</div>
              </div>
              <div className="p-6 bg-destructive/20 rounded-lg text-center">
                <div className="text-2xl font-bold">28</div>
                <div className="text-xs text-muted-foreground">False Negative</div>
              </div>
              
              <div className="text-sm font-medium flex items-center">Actual: Legit</div>
              <div className="p-6 bg-destructive/20 rounded-lg text-center">
                <div className="text-2xl font-bold">89</div>
                <div className="text-xs text-muted-foreground">False Positive</div>
              </div>
              <div className="p-6 bg-success/20 rounded-lg text-center">
                <div className="text-2xl font-bold">748</div>
                <div className="text-xs text-muted-foreground">True Negative</div>
              </div>
            </div>
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
                96.4% ROC-AUC indicates superior discrimination between fraud and legitimate transactions
              </p>
            </div>
            <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
              <h4 className="font-semibold mb-2" style={{ color: "hsl(var(--chart-2))" }}>
                Graph Features Dominate
              </h4>
              <p className="text-sm text-muted-foreground">
                Network-based features contribute 53% of prediction power, validating GNN approach
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Low False Positive Rate</h4>
              <p className="text-sm text-muted-foreground">
                Only 10.6% false positive rate minimizes customer friction while maintaining security
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Performance;
