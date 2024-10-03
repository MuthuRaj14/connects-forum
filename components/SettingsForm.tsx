"use client";
import React, { useEffect } from "react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { updateUsername } from "@/app/actions";
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";

const initialState = {
    message:'',
    status:"",
}

export const SettingsForm = ({
  username,
}: {
  username: string | null | undefined;
}) => {
    const [state , formAction] = useFormState(updateUsername ,initialState )
    const{toast}=useToast();
    useEffect(()=>{
        if(state?.status === 'green'){
            toast({
                title:"Successful",
                description:state.message,

            })

        } else if(state?.status === "error"){
            toast({
                title:"Error",
                description:state.message,
                variant:"destructive",
            })
        }
    },[state , toast])
  return (
    <form action={formAction}>
      <h1 className="text-3xl font-extralight tracking-tight ">Settings</h1>
      <Separator className="my-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground">
        In this Settings page you can change your username!
      </p>
      <Input
        defaultValue={username ?? undefined}
        name="username"
        required
        className="mt-2"
        maxLength={21}
        min={2}
      />

      <div className="w-full flex mt-5 gap-x-5 justify-end">
        <Button variant={"secondary"} asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButton text="Change Username"/>
      </div>
    </form>
  );
};
