import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { User } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

const TableUsers = ({ users }: { users: User[] }) => {
  const router: AppRouterInstance = useRouter();
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead className="text-right">KycVerification</TableHead>
            <TableHead className="text-right">Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => {
            return (
              <TableRow
                key={u._id}
                onClick={() => {
                  router.push(`/admin/transactions?userId=${u._id}`);
                }}
                className="hover:bg-gray-100"
              >
                <TableCell className="font-medium">
                  {u.firstName} {u.lastName}
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell className="text-right">{u.balance}</TableCell>
                <TableCell className="text-right">
                  {u.kycVerified ? "true" : "false"}
                </TableCell>
                <TableCell className="text-right">{u.code}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TableUsers;
