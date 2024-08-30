"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import React from "react";
import { registerSchema } from "@/validation/auth/authValidation";

import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { apiCall } from "@/utils/apiCalls";
import { API } from "@/utils/apiCalls";

type Props = {};

const Signup = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
  });

  const handleClickSignup = async (
    formValues: z.infer<typeof registerSchema>
  ) => {
    console.log(formValues);
    try {
      const response = await apiCall(`${API.API_AUTH_SIGNUP}`, "POST", {
        data: formValues,
      });
      if (response?.data?.data.token) {
        toast({
          title: "Success",
          description: "Signin successful",
          variant: "success",
          duration: 900,
        });
        setIsLoading(false);
        return router.push("/auth/signin");
      } else {
        toast({
          title: "Failed to signin",
          description: "Signin Failed",
          variant: "destructive",
          duration: 900,
        });
        setIsLoading(false);
        return undefined;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex  bg-gradient-to-r from-red-800 via-red-500 to-red-800 h-screen align-middle justify-center items-center bg-white shadow-md">
      <Card className="w-[430px] h-fit">
        <CardHeader>
          <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Sign Up
            <CardDescription className="mt-1">
              Sign up to use stock screening.
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-2"
              onSubmit={form.handleSubmit(handleClickSignup)}
            >
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Doe" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <small className="text-gray-600 mt-3 cursor-pointer">
                  Forgot password?
                </small>
                <small
                  className="text-blue-600 mt-3 cursor-pointer"
                  onClick={() => router.push("/auth/signin")}
                >
                  Already have account? Click here.
                </small>
              </div>
              <div>
                <Button
                  disabled={isLoading}
                  className="mt-4 w-full bg-gradient-to-r from-black via-gray-800  to-black  float-end mb-4"
                  type="submit"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;