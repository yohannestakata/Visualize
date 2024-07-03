import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services";
import { toast } from "@/components/ui/use-toast";

function useCreateUser() {
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast({
        title: "User Created!",
        description: "Please pass the credentials over to the user.",
      });
    },
  });

  return { mutate, isPending };
}

export default useCreateUser;
