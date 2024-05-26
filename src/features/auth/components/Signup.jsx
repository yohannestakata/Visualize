import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

import { RegisterSchema } from "../../../schema";
import { SelectGroup } from "@radix-ui/react-select";
import { NavLink } from "react-router-dom";

import useSignup from "../hooks/useSignup";

function Signup() {
  const { isPending, mutate } = useSignup();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      uniId: "",
      department: "",
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <div className="flex flex-col">
      <Card className="w-96 ">
        <CardHeader>
          <div className="justify-centerc:\Users\Yohannes\Desktop\SVG\logo.svg mb-3 flex text-center text-sm text-muted-foreground">
            <img
              src="../../../../images/logo.svg"
              alt=""
              className="mx-auto h-6"
            />
          </div>
          <CardTitle className="text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Sign-up and level up your knowledge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormField
                  control={form.control}
                  name="uniId"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Nickname</FormLabel> */}
                      <FormControl>
                        <Input placeholder="University ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Nickname</FormLabel> */}
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Accounting">
                                Accounting
                              </SelectItem>
                              <SelectItem value="Architecture">
                                Architecture
                              </SelectItem>
                              <SelectItem value="Computer Science">
                                Computer Science
                              </SelectItem>
                              <SelectItem value="Health">Health</SelectItem>
                              <SelectItem value="Marketing">
                                Marketing
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Password</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit" disabled={isPending}>
                  {!isPending && "Create account"}
                  {isPending && "Creating account..."}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <span className="w-full text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <NavLink to={"/auth/login"} className="underline">
              Login
            </NavLink>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
