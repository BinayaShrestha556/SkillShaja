import { auth } from "@/auth";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/db/db";
import { paymentRegistration } from "@/server-actions/paymentRegistration";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const page = async () => {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) redirect("/signin");
  const paymentMethod = await prisma.payment.findUnique({
    where: { userId: id },
  });
  if (paymentMethod)
    return (
      <div className="h-[80vh] w-screen flex items-center justify-center">
        You have already entered your payment details
      </div>
    );
  const schema = z.object({
    account: z.string().min(1),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      account: "",
    },
  });
  const [transition, setTransition] = useTransition();
  const onSubmit = (values: z.infer<typeof schema>) => {
    setTransition(async () => await paymentRegistration(id, values.account));
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full bg-transparent border-none border-b"
                    {...field}
                    disabled={transition}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      </form>
    </div>
  );
};

export default page;
