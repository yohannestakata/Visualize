import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { RegisterSchema2 } from "../../../schema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function UpdateProfileLayout() {
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(RegisterSchema2),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      uniId: "",
      department: "",
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (fields) =>
      axios({
        url: `${SERVER_URL}/users/${user._id}`,
        data: fields,
        method: "patch",
      }),
    onSuccess: () => {
      toast({ title: "Profile updated!" });
      navigate("/learn/models");
    },
  });
  function onSubmit(values) {
    mutate(values);
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col">
        <Card className="w-96">
          <CardHeader>
            <div className="mb-3 flex justify-center text-sm text-muted-foreground"></div>
            <CardTitle>Edit your profile</CardTitle>
            <CardDescription>
              Sign-up and level up your knowledge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid w-full items-center gap-2">
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Nickname</FormLabel> */}
                        <FormControl>
                          <Input placeholder="Nickname" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Email</FormLabel> */}
                        <FormControl>
                          <Input placeholder="Email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" type="submit" disabled={isPending}>
                    {!isPending && "Edit profile"}
                    {isPending && "Editing profile..."}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default UpdateProfileLayout;
