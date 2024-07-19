import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../../../components/Heading";
import { NavLink } from "react-router-dom";
import { UserPlus } from "lucide-react";

function AccountsLayout() {
  const { data } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/users`,
        method: "get",
      }),
    queryKey: ["users", "super-admin"],
  });

  const users = data?.data?.data?.filter(
    (user) => user.role.toLowerCase() !== "student",
  );

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <Heading>Accounts</Heading>
        <NavLink
          className={buttonVariants({ variant: "default" }) + " bg-background"}
          to={"/super-admin/create-accounts"}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Create Account</span>
        </NavLink>
      </div>
      <div className="mt-4">
        <Table>
          <TableCaption>A list of admins and teachers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Uni ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.nickname}</TableCell>
                <TableCell>{user.uniId}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.department?.length ? user.department[0].name : ""}
                </TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AccountsLayout;
