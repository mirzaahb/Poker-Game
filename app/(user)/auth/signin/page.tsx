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
import { authSchema } from "@/validation/auth/authValidation";

import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";

import { API } from "@/utils/apiCalls";
import { apiCall } from "@/utils/apiCalls";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";

type Props = {
  setIsSignUp: (active: boolean) => void;
};

export interface CustomJwtPayload extends JwtPayload {
  isAuthorized?: boolean;
  username: string;
}

const Signin = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickSignin = async (formValues: z.infer<typeof authSchema>) => {
    setIsLoading(true);
    try {
      const response = await apiCall(`${API.API_AUTH_LOGIN}`, "POST", {
        data: { email: formValues.email, password: formValues.password },
      });
      console.log(response);

      if (response?.data) {
        let jwtToken = jwtDecode(response?.data?.data) as CustomJwtPayload;
        console.log(jwtToken);

        if (jwtToken?.isAuthorized === true) {
          Cookies.set("token", response?.data?.data, { expires: 1 });
          Cookies.set("user", JSON.stringify(jwtToken), { expires: 1 });
          toast({
            title: "Success",
            description: "Signin successful",
            variant: "success",
            duration: 900,
          });
          setIsLoading(false);
          return router.push("/dashboard");
        }
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
    <div className="flex bg-gradient-to-r from-red-800 via-red-500 to-red-800 h-screen align-middle justify-center items-center bg-white shadow-md">
      <Card className="w-[430px] h-fit">
        <CardHeader>
          <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Signin
            <CardDescription className="mt-1">
              Sign in to use stock screening.
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-2"
              onSubmit={form.handleSubmit(handleClickSignin)}
            >
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
                  onClick={() => router.push("/auth/signup")}
                >
                  Register here.
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

export default Signin;