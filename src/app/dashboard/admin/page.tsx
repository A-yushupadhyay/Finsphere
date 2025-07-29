// src/app/dashboard/admin/page.tsx
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

// ✅ Import Prisma types
import { User, Kyc } from "@prisma/client";

type UserWithKYC = User & {
  kyc: Kyc | null;
};

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const users: UserWithKYC[] = await db.user.findMany({
    include: { kyc: true },
  });

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">👨‍⚖️ Admin Panel</h1>

      {users.length === 0 ? (
        <EmptyState
          title="No users found"
          subtitle="User records will show here after signups."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id} animated>
              <div className="space-y-2">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>

                <p>
                  <strong>KYC:</strong>{" "}
                  {user.kyc?.status ? (
                    <Badge variant="outline">{user.kyc.status}</Badge>
                  ) : (
                    <span className="text-gray-500">Not uploaded</span>
                  )}
                </p>

                {user.kyc?.document && (
                  <a
                    href={user.kyc.document}
                    target="_blank"
                    className="text-blue-600 underline text-sm"
                  >
                    📄 View KYC Document
                  </a>
                )}

                {user.kyc?.status === "pending" && (
                  <form action="/api/admin/approve-kyc" method="POST">
                    <input type="hidden" name="userId" value={user.id} />
                    <Button
                      type="submit"
                      variant="green"
                      className="mt-3 w-full"
                    >
                      ✅ Approve KYC
                    </Button>
                  </form>
                )}

                <div className="pt-3 border-t mt-4">
                  <p>
                    <strong>Status:</strong>{" "}
                    {user.isFrozen ? (
                      <span className="text-red-600">❄️ Frozen</span>
                    ) : (
                      <span className="text-green-600">✅ Active</span>
                    )}
                  </p>

                  <form
                    action="/api/admin/freeze-user"
                    method="POST"
                    className="mt-2"
                  >
                    <input type="hidden" name="userId" value={user.id} />
                    <input
                      type="hidden"
                      name="freeze"
                      value={(!user.isFrozen).toString()}
                    />
                    <Button
                      type="submit"
                      variant={user.isFrozen ? "green" : "red"}
                      className="w-full"
                    >
                      {user.isFrozen ? "Unfreeze Account" : "Freeze Account"}
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
