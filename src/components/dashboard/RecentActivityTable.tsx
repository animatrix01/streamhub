import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  user: string;
  email: string;
  status: "completed" | "pending" | "failed";
  date: string;
  amount: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    user: "Alex Johnson",
    email: "alex@example.com",
    status: "completed",
    date: "Dec 20, 2024",
    amount: "$249.00",
  },
  {
    id: "2",
    user: "Sarah Williams",
    email: "sarah@example.com",
    status: "pending",
    date: "Dec 20, 2024",
    amount: "$149.00",
  },
  {
    id: "3",
    user: "Michael Brown",
    email: "michael@example.com",
    status: "completed",
    date: "Dec 19, 2024",
    amount: "$349.00",
  },
  {
    id: "4",
    user: "Emily Davis",
    email: "emily@example.com",
    status: "failed",
    date: "Dec 19, 2024",
    amount: "$99.00",
  },
  {
    id: "5",
    user: "Chris Miller",
    email: "chris@example.com",
    status: "completed",
    date: "Dec 18, 2024",
    amount: "$449.00",
  },
  {
    id: "6",
    user: "Jessica Wilson",
    email: "jessica@example.com",
    status: "pending",
    date: "Dec 18, 2024",
    amount: "$199.00",
  },
];

const statusStyles = {
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
};

export function RecentActivityTable() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Latest payment activity across all users
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-border/50 hover:bg-accent/30 transition-colors duration-200"
              >
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{transaction.user}</p>
                    <p className="text-sm text-muted-foreground">{transaction.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize font-medium border",
                      statusStyles[transaction.status]
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{transaction.date}</td>
                <td className="p-4 text-right font-medium text-foreground">
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
