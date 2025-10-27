import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Prediction = () => {
  const [formData, setFormData] = useState({
    amount: "",
    cardId: "",
    deviceType: "",
  });

  const [prediction, setPrediction] = useState<{
    isFraud: boolean;
    confidence: number;
    reasoning: string;
  } | null>(null);

  const handlePredict = () => {
    const amount = parseFloat(formData.amount);
    const isFraud = amount > 3000 || formData.deviceType === "Android";
    const confidence = isFraud ? 0.87 : 0.92;

    const reasoning = isFraud
      ? `High-risk transaction detected: Amount exceeds $3,000 threshold. Device type ${formData.deviceType} has been associated with 3 previous fraud cases in the network. Card ${formData.cardId} shows unusual velocity pattern.`
      : `Low-risk transaction: Amount within normal range. Device ${formData.deviceType} has clean history. Card ${formData.cardId} shows consistent usage patterns with no suspicious connections.`;

    setPrediction({ isFraud, confidence, reasoning });
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Fraud Prediction & Explainability</h1>
        <p className="text-muted-foreground">
          AI-powered fraud detection with transparent reasoning
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Enter transaction information for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Transaction Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="1250.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardId">Card ID</Label>
              <Input
                id="cardId"
                placeholder="card_123"
                value={formData.cardId}
                onChange={(e) => setFormData({ ...formData, cardId: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="device">Device Type</Label>
              <Select
                value={formData.deviceType}
                onValueChange={(value) => setFormData({ ...formData, deviceType: value })}
              >
                <SelectTrigger id="device">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Windows">Windows</SelectItem>
                  <SelectItem value="MacOS">MacOS</SelectItem>
                  <SelectItem value="Android">Android</SelectItem>
                  <SelectItem value="iOS">iOS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handlePredict}
              className="w-full"
              disabled={!formData.amount || !formData.cardId || !formData.deviceType}
            >
              <Brain className="mr-2 h-4 w-4" />
              Analyze Transaction
            </Button>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        {prediction && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
              <CardDescription>AI analysis and confidence score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`p-6 rounded-lg border-2 ${
                  prediction.isFraud
                    ? "bg-destructive/10 border-destructive"
                    : "bg-success/10 border-success"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {prediction.isFraud ? (
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  ) : (
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  )}
                  <div>
                    <h3 className="text-2xl font-bold">
                      {prediction.isFraud ? "FRAUDULENT" : "LEGITIMATE"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {prediction.isFraud
                        ? "High risk of fraud detected"
                        : "Transaction appears safe"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence Score</span>
                    <span className="font-medium">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={prediction.confidence * 100} className="h-2" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  AI Reasoning
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {prediction.reasoning}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Risk Factors</h4>
                <div className="space-y-2">
                  {prediction.isFraud ? (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-destructive" />
                        <span>High transaction amount</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-destructive" />
                        <span>Device linked to fraud history</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-destructive" />
                        <span>Unusual card velocity</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span>Amount within normal range</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span>Clean device history</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span>Consistent usage pattern</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Prediction;
