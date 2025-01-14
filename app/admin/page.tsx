"use client";

import TableUsers from "@/components/admin/TableUsers";
import HeaderBox from "@/components/homecomp/HeaderBox";
import { Button } from "@/components/ui/button";
import { useAdminUsers } from "@/hooks/admin/useAdmin";
import { useAccount } from "@/hooks/getUser";
import { useAuthentication } from "@/lib/actions/user.actions";

import { User } from "@/types";
import { LogOut } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: User } = useAccount();
  const { data, isLoading } = useAdminUsers();
  const router: AppRouterInstance = useRouter();

  const { logout } = useAuthentication();

  const handleLogOut = async () => {
    await logout();
    router.push("/sign-in");
  };

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          type="greeting"
          title="Welcome Admin"
          subtext="Here you get to manage each user activities"
          user={User?.firstName}
        />
        <Button
          onClick={handleLogOut}
          className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout <LogOut size={20} />
        </Button>
      </div>

      <section className="flex w-full flex-col gap-6">
        {isLoading && (
          <div className="flex h-screen w-full items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-8 w-8  animate-spin rounded-full border-4 border-primary-main border-t-bankGradient"></div>
              <p className="text-sm text-gray-600">Loading...</p>
            </div>
          </div>
        )}
        {!isLoading && <TableUsers users={data as User[]} />}
      </section>
    </div>
  );
}
