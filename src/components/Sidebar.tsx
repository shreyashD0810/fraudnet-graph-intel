import { NavLink } from "react-router-dom";
import { Home, BarChart3, Network, Brain, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/data", icon: BarChart3, label: "Data & EDA" },
  { to: "/graph", icon: Network, label: "Graph Viz" },
  { to: "/prediction", icon: Brain, label: "Prediction" },
  { to: "/performance", icon: TrendingUp, label: "Performance" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FraudNet
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Graph-Based Intelligence
          </p>
        </div>
        <ThemeToggle />
      </div>
      
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-primary/10 hover:text-primary",
                isActive
                  ? "bg-primary/20 text-primary font-medium shadow-glow"
                  : "text-muted-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
