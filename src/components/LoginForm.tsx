"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { getCountryDataList, getEmojiFlag } from "countries-list";
import { login } from "@/actions";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .optional(),
  phone: z
    .string()
    .min(2, {
      message: "phone must be at least 2 characters.",
    })
    .optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  countryCode: z.string().optional(),
});

export default function LoginForm({ useEmail }: { useEmail: boolean }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const countries = getCountryDataList();
  return (
    <Form {...form}>
      <form action={login} className="space-y-3">
        {useEmail ? (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input placeholder="itsTomLie@gmail.com" {...field} />
                  </FormControl>
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
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Code</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={`${getEmojiFlag("ID")} Indonesia (+62)`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.name} value={country.name}>
                            {`${getEmojiFlag(country.iso2)}
                          ${country.name} (+${country.phone})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>

                  <FormControl>
                    <Input placeholder="82723513230" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-xs">
              We&apos;ll call or text you to confirm your number. Standard
              message and data rates apply.{" "}
              <span className="underline font-medium">Privacy Policy</span>
            </p>
          </>
        )}

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}
