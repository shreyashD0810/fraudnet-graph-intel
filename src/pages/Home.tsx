import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Network, Brain, Zap } from "lucide-react";
import { GraphBackground } from "@/components/GraphBackground";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Network,
      title: "Graph Neural Networks",
      description: "Advanced GNN architecture to detect complex fraud patterns",
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Machine learning models with 93.45% ROC-AUC accuracy",
    },
    {
      icon: Shield,
      title: "Real-Time Detection",
      description: "Identify fraud rings instantly across transactions",
    },
    {
      icon: Zap,
      title: "Explainable AI",
      description: "Transparent reasoning for every fraud prediction",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GraphBackground />
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                FraudNet
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground/90">
              Graph-Based Financial Intelligence System
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leveraging Graph Neural Networks to uncover complex fraud rings in real-time.
              Transform transactional data into intelligent networks.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-glow"
              onClick={() => navigate("/data")}
            >
              Explore Data
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
              onClick={() => navigate("/prediction")}
            >
              Run Prediction
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto">
          {[
            { value: "93.45%", label: "ROC-AUC Score" },
            { value: "118K+", label: "Transactions Analyzed" },
            { value: "Real-Time", label: "Detection Speed" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
