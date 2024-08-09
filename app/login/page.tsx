"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
  };
  

  const FormSchema = z.object({
    email: z.string().email("Email incorrecte"),
    password: z.string().min(6),
    
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  
  return (
    <main className="flex-grow flex items-center justify-center">
       <Card className="w-full max-w-md shadow-md">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mt-4 mb-4">Login</h1>
          <Form {...form}>
            <form onSubmit={handleSubmit}>
            <FormItem className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormItem>
            <FormItem className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormItem>
            <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <p>Don&apos;t have an account? <a href="/register" className="text-blue-500">Register</a></p>
        </CardFooter>
      </Card>
    </main>
  );
}
