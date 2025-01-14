import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

const TableUsers = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const closeModal = () => setSelectedUser(null);

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
          {users.map((u) => (
            <TableRow
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className="cursor-pointer hover:bg-gray-100"
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
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <p className="mb-4">What would you like to do?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  router.push(`/admin/transactions?userId=${selectedUser._id}`);
                  closeModal();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Go to Transaction
              </button>
              <button
                onClick={() => {
                  router.push(`/admin/users?userId=${selectedUser._id}`);
                  closeModal();
                }}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Go to User Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableUsers;
