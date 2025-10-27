import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NetworkGraph } from "@/components/NetworkGraph";
import { generateMockGraph } from "@/lib/mockData";
import { Search } from "lucide-react";

const GraphVisualization = () => {
  const [transactionId, setTransactionId] = useState<number>(42);
  const [graphData, setGraphData] = useState(generateMockGraph(42));

  const handleSearch = () => {
    const data = generateMockGraph(transactionId);
    setGraphData(data);
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Graph Network Visualization</h1>
        <p className="text-muted-foreground">
          Explore transaction relationships and fraud patterns through interactive graphs
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Search Transaction</CardTitle>
          <CardDescription>Enter a transaction ID to visualize its network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="txnId">Transaction ID</Label>
              <Input
                id="txnId"
                type="number"
                value={transactionId}
                onChange={(e) => setTransactionId(Number(e.target.value))}
                placeholder="Enter transaction ID (1-1000)"
                min={1}
                max={1000}
              />
            </div>
            <Button onClick={handleSearch} className="mt-auto">
              <Search className="mr-2 h-4 w-4" />
              Visualize
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Network Graph</CardTitle>
          <CardDescription>
            Interactive visualization of transaction relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NetworkGraph nodes={graphData.nodes} edges={graphData.edges} />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Legend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm">Fraudulent Transaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm">Legitimate Transaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-2" />
              <span className="text-sm">Card ID</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-3" />
              <span className="text-sm">Device Type</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Network Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Nodes:</span>
              <span className="text-sm font-medium">{graphData.nodes.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Connections:</span>
              <span className="text-sm font-medium">{graphData.edges.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Fraud Nodes:</span>
              <span className="text-sm font-medium text-destructive">
                {graphData.nodes.filter((n) => n.fraud).length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Interaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Click and drag to move nodes</p>
            <p>• Scroll to zoom in/out</p>
            <p>• Hover over nodes for details</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GraphVisualization;
