import { Button } from "@/components/ui/button";
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

import { RegisterSchema } from "../../../schema/index";
import { NavLink } from "react-router-dom";

function Login() {
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
    console.log(values);
  }
  return (
    <div className="flex flex-col">
      <Card className="w-96 backdrop-blur-sm bg-transparent">
        <CardHeader>
          <div className="text-center mb-3 text-sm text-muted-foreground flex justify-centerc:\Users\Yohannes\Desktop\SVG\logo.svg">
            <img
              src="../../../../images/logo.svg"
              alt=""
              className="h-6 mx-auto"
            />
          </div>
          <CardTitle className="text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to your existing account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid w-full items-center gap-2">
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
                <Button className="w-full" type="submit">
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <span className="text-center text-sm w-full text-muted-foreground">
            Don*&apos;t have an account?{" "}
            <NavLink to={"/auth/signup"} className="underline">
              Signup
            </NavLink>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
