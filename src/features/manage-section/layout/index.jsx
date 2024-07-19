import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function ManageSectionLayout() {
  const { user } = useUser();
  const section = user.representing;
  const { toast } = useToast();

  const { data: users } = useQuery({
    queryKey: ["users", section],
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/users?sections=${section}&role=Student`,
        method: "get",
      }),
  });

  const sectionStudents = users?.data?.data;
  const queryClient = useQueryClient();
  console.log(sectionStudents);

  const { mutate: removeStudent } = useMutation({
    mutationFn: (studId) => {
      return axios({
        url: `${SERVER_URL}/users/removeFromSection/${studId}`,
        method: "patch",
        data: { section },
      });
    },
    onSuccess: () => {
      toast({ title: "Success! Student removed from section." });
      queryClient.invalidateQueries(["users", section]);
    },
  });

  return (
    <div className="grid grid-cols-9 gap-4">
      <div className="col-span-7 col-start-2">
        <Table>
          <TableCaption>A list of students in section.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>University ID</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sectionStudents?.map((stud) => (
              <TableRow key={stud._id}>
                <TableCell className="font-medium">{stud.nickname}</TableCell>
                <TableCell>{stud.email}</TableCell>
                <TableCell>{stud.uniId}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-fit w-fit p-1 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      removeStudent(stud._id);
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ManageSectionLayout;
