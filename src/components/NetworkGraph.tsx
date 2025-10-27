import { useEffect, useRef } from "react";
import { GraphNode, GraphEdge } from "@/lib/mockData";

interface NetworkGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const NetworkGraph = ({ nodes, edges }: NetworkGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = container.clientWidth;
    canvas.height = 500;

    // Simple force-directed layout
    const nodePositions = new Map<
      string,
      { x: number; y: number; vx: number; vy: number }
    >();

    // Initialize positions
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      nodePositions.set(node.id, {
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      });
    });

    const getNodeColor = (node: GraphNode) => {
      if (node.type === "transaction") {
        return node.fraud ? "#FF4B4B" : "#00BFA5";
      }
      if (node.type === "card") return "#4682B4";
      return "#FFD700";
    };

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = "hsl(210 30% 8%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw edges
      ctx.strokeStyle = "rgba(100, 100, 100, 0.3)";
      ctx.lineWidth = 2;
      edges.forEach((edge) => {
        const source = nodePositions.get(edge.source);
        const target = nodePositions.get(edge.target);
        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pos = nodePositions.get(node.id);
        if (!pos) return;

        // Apply forces
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dx = centerX - pos.x;
        const dy = centerY - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          pos.vx += (dx / distance) * 0.01;
          pos.vy += (dy / distance) * 0.01;
        }

        // Apply repulsion
        nodePositions.forEach((other, otherId) => {
          if (otherId === node.id) return;
          const dx = pos.x - other.x;
          const dy = pos.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < 100) {
            pos.vx += (dx / distance) * 0.5;
            pos.vy += (dy / distance) * 0.5;
          }
        });

        pos.vx *= 0.95;
        pos.vy *= 0.95;
        pos.x += pos.vx;
        pos.y += pos.vy;

        // Draw node
        const radius = node.type === "transaction" ? 12 : 8;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = getNodeColor(node);
        ctx.fill();

        // Draw label
        ctx.fillStyle = "white";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          node.type === "transaction" ? `$${node.amount}` : node.id,
          pos.x,
          pos.y + radius + 12
        );
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [nodes, edges]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} className="w-full rounded-lg border border-border" />
    </div>
  );
};
