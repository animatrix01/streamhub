import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserGrowthChart } from "@/components/dashboard/UserGrowthChart";
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable";
import { ServerHealthGauge } from "@/components/dashboard/ServerHealthGauge";
import { DollarSign, Users, Activity, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const sparklineData1 = [30, 40, 35, 50, 55, 60, 70, 65, 75, 80, 85, 95];
const sparklineData2 = [20, 25, 30, 28, 35, 45, 42, 50, 55, 52, 60, 65];
const sparklineData3 = [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38];
const sparklineData4 = [100, 105, 95, 110, 115, 108, 120, 125, 130, 135, 140, 148];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <DashboardLayout userEmail="user@example.com" onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <StatsCard
              title="Total Revenue"
              value="$124,580"
              change={12.5}
              icon={<DollarSign className="w-5 h-5" />}
              sparklineData={sparklineData1}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <StatsCard
              title="Active Users"
              value="15,847"
              change={8.2}
              icon={<Users className="w-5 h-5" />}
              sparklineData={sparklineData2}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <StatsCard
              title="Conversion Rate"
              value="3.8%"
              change={-2.1}
              icon={<Activity className="w-5 h-5" />}
              sparklineData={sparklineData3}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <StatsCard
              title="Total Orders"
              value="1,482"
              change={15.3}
              icon={<CreditCard className="w-5 h-5" />}
              sparklineData={sparklineData4}
            />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <UserGrowthChart />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <ServerHealthGauge />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <RecentActivityTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
