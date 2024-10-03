"use client";
import { Textarea } from "@/components/ui/textarea";
import { updateSubDescription } from "../actions";
import { useFormState } from "react-dom";
import { SaveButton } from "@/components/SubmitButtons";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface IAppProps {
  subName: string;
  description: string | null | undefined;
}

const initalState = {
  message: "",
  status: "",
};

export function SubDescriptionForm({ description, subName }: IAppProps) {
  const [state, formAction] = useFormState(updateSubDescription, initalState);
  const {toast} = useToast()
  useEffect(()=>{
    if(state.status === 'green'){
        toast({
            title:'Success',
            description:state.message,
        });

    }else if(state.status === 'error'){
        toast({
            title:"Error",
            description:state.message,
            variant:"destructive",
        })
    }
  },[state , toast])
  return (
    <form className="mt-3" action={formAction}>
      <input type="hidden" name="subName" value={subName} />
      <Textarea
        placeholder="Create your custom description for your subreddit"
        maxLength={100}
        name="description"
        defaultValue={description ?? undefined}
      />
      <SaveButton />
    </form>
  );
}
