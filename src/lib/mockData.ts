export interface Transaction {
  id: number;
  amount: number;
  isFraud: boolean;
  cardId: string;
  deviceType: string;
  timestamp: string;
}

export const mockTransactionData: Transaction[] = Array.from({ length: 1000 }, (_, i) => {
  const isFraud = Math.random() < 0.163;
  return {
    id: i + 1,
    amount: isFraud
      ? Math.round(Math.random() * 10000 + 1000)
      : Math.round(Math.random() * 2000 + 50),
    isFraud,
    cardId: `card_${Math.floor(Math.random() * 100) + 100}`,
    deviceType: ["Windows", "MacOS", "Android", "iOS"][Math.floor(Math.random() * 4)],
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
});

export interface GraphNode {
  id: string;
  type: "transaction" | "card" | "device";
  fraud?: boolean;
  amount?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export const generateMockGraph = (transactionId: number): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  const transaction = mockTransactionData.find((t) => t.id === transactionId);
  if (!transaction) return { nodes: [], edges: [] };

  const nodes: GraphNode[] = [
    {
      id: `txn_${transactionId}`,
      type: "transaction",
      fraud: transaction.isFraud,
      amount: transaction.amount,
    },
    { id: transaction.cardId, type: "card" },
    { id: transaction.deviceType, type: "device" },
  ];

  const edges: GraphEdge[] = [
    { source: `txn_${transactionId}`, target: transaction.cardId },
    { source: `txn_${transactionId}`, target: transaction.deviceType },
  ];

  // Add related transactions
  const relatedTransactions = mockTransactionData
    .filter(
      (t) =>
        t.id !== transactionId &&
        (t.cardId === transaction.cardId || t.deviceType === transaction.deviceType)
    )
    .slice(0, 5);

  relatedTransactions.forEach((t) => {
    const nodeId = `txn_${t.id}`;
    nodes.push({
      id: nodeId,
      type: "transaction",
      fraud: t.isFraud,
      amount: t.amount,
    });

    if (t.cardId === transaction.cardId) {
      edges.push({ source: nodeId, target: transaction.cardId });
    }
    if (t.deviceType === transaction.deviceType) {
      edges.push({ source: nodeId, target: transaction.deviceType });
    }
  });

  return { nodes, edges };
};
