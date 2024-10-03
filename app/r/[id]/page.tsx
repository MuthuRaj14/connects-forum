import { updateSubDescription } from "@/app/actions";
import { SubDescriptionForm } from "@/app/components/SubDescriptionForm";
import prisma from "@/app/lib/db";
import { SaveButton, SubmitButton } from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import {unstable_noStore as noStore} from 'next/cache'

// Fetch subreddit data by name and return the result
async function getData(name: string) {
  noStore();
  return await prisma.subreddit.findUnique({
    where: {
      name: name,
    },
    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true,
    },
  });
}

export default async function SubRedditRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Handle case when no data is found
  if (!data) {
    return (
      <div className="max-w-[1000px] mx-auto flex gap-x-10 nt-4">
        <div className="w-[65%] flex flex-col gap-y-5">
          <h1>Subreddit not found</h1>
        </div>
        <div className="w-[35%]">
          <Card>
            <div className="bg-muted p-4 font-semibold">About Community</div>
            <div className="p-4">
              <p>No information available for this subreddit.</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 nt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1>Hello from the post section</h1>
      </div>
      <div className="w-[35%]">
        <Card>
          <div className="bg-muted p-4 font-semibold">About Community</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${data?.name}`}
                alt="Image of subreddit"
                width={60}
                height={60}
                className="rounded-full h-16 w-16"
              />
              <Link href={`/r/${data?.name}`} className="font-medium">
                r/{data?.name}
              </Link>
            </div>
            {user?.id === data?.userId ? (
              <SubDescriptionForm
                description={data?.description}
                subName={params.id}
              />
            ) : (
              <p className="text-sm font-normal text-secondary-foreground mt-2">
                {data?.description}
              </p>
            )}
            <div className="flex items-center gap-x-2 mt-4">
              <p className="text-muted-foreground font-medium text-sm">
                Created: "{}
                {new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <Separator className="my-5" />
            <Button asChild className="rounded-full w-full">
              <Link
                href={user?.id ? `/r/${data.name}/create` : "/api/auth/login"}
              >
                Create Post
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
