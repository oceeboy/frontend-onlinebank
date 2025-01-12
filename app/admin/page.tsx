"use client";

import TableUsers from "@/components/admin/TableUsers";
import HeaderBox from "@/components/homecomp/HeaderBox";
import Footer from "@/components/navigation/footer";
import { Button } from "@/components/ui/button";
import { useAdminUsers } from "@/hooks/admin/useAdmin";
import { useAccount } from "@/hooks/getUser";
import { User } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: User } = useAccount();
  const { data, isLoading } = useAdminUsers();
  const router: AppRouterInstance = useRouter();

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          type="greeting"
          title="Welcome Admin"
          subtext="Here you get to manage each user activities"
          user={User?.firstName}
        />
      </div>
      <Footer user={User as User} />
      {data?.map((u) => {
        return (
          <div key={u._id} className="m-4">
            <div className="p-5">
              {u.firstName} {u.lastName}
            </div>
            <Button
              onClick={() => {
                router.push(`/admin/transactions?userId=${u._id}`);
              }}
              className="bg-bankGradient text-cyan-50"
            >
              view transaction
            </Button>
          </div>
        );
      })}
      <section className="flex w-full flex-col gap-6">
        {!isLoading && <TableUsers users={data as User[]} />}
      </section>
    </div>
  );
}
