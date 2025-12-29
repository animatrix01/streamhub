import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@supabase/supabase-js";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  AlertCircle,
  Info,
  MessageSquare,
  UserPlus,
  CreditCard,
  Settings,
  Trash2,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "info",
    title: "Welcome to StreamHub!",
    message: "Get started by exploring your dashboard and setting up your first project.",
    time: "Just now",
    read: false,
    icon: Info,
  },
  {
    id: 2,
    type: "success",
    title: "Payment Successful",
    message: "Your payment of $29.00 has been processed successfully.",
    time: "2 hours ago",
    read: false,
    icon: CreditCard,
  },
  {
    id: 3,
    type: "user",
    title: "New Team Member",
    message: "John Doe has joined your team as a developer.",
    time: "5 hours ago",
    read: true,
    icon: UserPlus,
  },
  {
    id: 4,
    type: "alert",
    title: "Server Alert",
    message: "High CPU usage detected on production server.",
    time: "1 day ago",
    read: true,
    icon: AlertCircle,
  },
  {
    id: 5,
    type: "message",
    title: "New Comment",
    message: "Jane left a comment on your latest report.",
    time: "2 days ago",
    read: true,
    icon: MessageSquare,
  },
];

const notificationSettings = [
  { id: "email_all", label: "Email Notifications", description: "Receive all notifications via email", enabled: true },
  { id: "push_all", label: "Push Notifications", description: "Receive push notifications on your device", enabled: true },
  { id: "billing", label: "Billing Alerts", description: "Get notified about payments and invoices", enabled: true },
  { id: "security", label: "Security Alerts", description: "Receive alerts about security events", enabled: true },
  { id: "marketing", label: "Marketing Updates", description: "Receive product updates and promotions", enabled: false },
  { id: "weekly", label: "Weekly Digest", description: "Get a weekly summary of your activity", enabled: false },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [notifs, setNotifs] = useState(notifications);
  const [settings, setSettings] = useState(notificationSettings);

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

  const markAsRead = (id: number) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  const toggleSetting = (id: string) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-500";
      case "alert":
        return "bg-red-500/20 text-red-500";
      case "user":
        return "bg-blue-500/20 text-blue-500";
      case "message":
        return "bg-purple-500/20 text-purple-500";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  return (
    <DashboardLayout userEmail="user@example.com" onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-primary text-primary-foreground">{unreadCount} new</Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your notifications and preferences.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-4">
            {notifs.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </CardContent>
              </Card>
            ) : (
              notifs.map((notif, index) => (
                <Card
                  key={notif.id}
                  className={`bg-card border-border transition-all duration-300 hover:border-primary/30 animate-fade-in ${
                    !notif.read ? "border-l-4 border-l-primary" : ""
                  }`}
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getNotificationIcon(notif.type)}`}>
                        <notif.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className={`font-semibold ${notif.read ? "text-foreground" : "text-foreground"}`}>
                              {notif.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notif.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notif.id)}
                                className="text-muted-foreground hover:text-primary"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notif.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="mt-6 space-y-4">
            {notifs.filter((n) => !n.read).length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <CheckCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">All caught up!</h3>
                  <p className="text-muted-foreground">You have no unread notifications.</p>
                </CardContent>
              </Card>
            ) : (
              notifs
                .filter((n) => !n.read)
                .map((notif, index) => (
                  <Card
                    key={notif.id}
                    className="bg-card border-border border-l-4 border-l-primary transition-all duration-300 hover:border-primary/30 animate-fade-in"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getNotificationIcon(notif.type)}`}>
                          <notif.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-foreground">{notif.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notif.id)}
                                className="text-muted-foreground hover:text-primary"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteNotification(notif.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <h3 className="font-medium text-foreground">{setting.label}</h3>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => toggleSetting(setting.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
