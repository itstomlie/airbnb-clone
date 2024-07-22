"use client";

import { useState } from "react";
import { getCountryDataList, getEmojiFlag, TCountryCode } from "countries-list";
import { LucideLoader2 } from "lucide-react";
import { login } from "@/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = getCountryDataList();

export default function LoginForm({ useEmail }: { useEmail: boolean }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    countryCode: "ID",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      countryCode: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    await login(form);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {useEmail ? (
        <>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="itsTomLie@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <Label htmlFor="countryCode">Country Code</Label>
            <Select
              value={form.countryCode}
              onValueChange={handleCountryCodeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={`${getEmojiFlag(
                    form.countryCode as TCountryCode
                  )} ${
                    countries.find(
                      (country) => country.iso2 === form.countryCode
                    )?.name
                  } (+${
                    countries.find(
                      (country) => country.iso2 === form.countryCode
                    )?.phone
                  })`}
                />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.iso2} value={country.iso2}>
                    {`${getEmojiFlag(country.iso2)} ${country.name} (+${
                      country.phone
                    })`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="82723513230"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <p className="text-xs">
            We&apos;ll call or text you to confirm your number. Standard message
            and data rates apply.{" "}
            <span className="underline font-medium">Privacy Policy</span>
          </p>
        </>
      )}

      <Button type="submit" className="w-full">
        {loading ? <LucideLoader2 className="animate-spin" /> : "Continue"}
      </Button>
    </form>
  );
}
