import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { RegisterSchema } from "../../schema/index";

function Login() {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      uniId: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <Card className="w-96">
        <CardHeader>
          <div className="text-center mb-3 text-sm text-muted-foreground">
            /* Visualize Logo Here */
          </div>
          <CardTitle className="text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Fill the form below to create your account.
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
                  Create account
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <span className="text-center text-sm w-full text-muted-foreground">
            Already have an account?{" "}
            <a href="" className="underline">
              Login
            </a>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
