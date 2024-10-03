import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeToggle";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";

export const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
      <Link href="/" className="flex gap-5 items-center justify-center">
        <p className="  text-2xl font-bold">
          <span className="text-stone-600 ">Connects</span>
          <span className="text-sm ml-2 text-stone-400">by </span>
          <span className="font-mono text-orange-400"> KMMR</span>
        </p>
      </Link>
      <div className="flex items-center gap-x-4">
        <ModeToggle />
        {user ? (
          <UserDropdown />
        ) : (
          <div className="flex items-center gap-x-4">
            <Button variant="secondary" asChild>
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Log In</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
