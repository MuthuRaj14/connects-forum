import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostCard } from "./components/CreatePostCard";
import prisma from "./lib/db";
import { PostCard } from "./components/PostCard";
import Pagination from "./components/Pagination";

async function getData(page: number) {
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 7,
      skip: (page - 1) * 7,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        User: {
          select: {
            userName: true,
          },
        },
        subName: true,
        Vote: {
          select: {
            voteType: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { data, count };
}

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page as string, 10) || 1; // Default to 1 if undefined

  // Display loading text
  const loadingText = <p>Loading...</p>;

  // Fetch data
  const { count, data } = await getData(page); // Use the parsed page number

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
        {data.length === 0 ? loadingText : data.map((post) => (
          <PostCard
            voteCount={post.Vote.reduce((acc, vote) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;
              return acc;
            }, 0)}
            id={post.id}
            imageString={post.imageString}
            jsonContent={post.textContent}
            subName={post.subName as string}
            title={post.title}
            key={post.id}
            userName={post.User?.userName as string}
          />
        ))}
        <Pagination totalPages={Math.ceil(count / 7)} />
      </div>
      <div className="w-[35%]">
        <Card>
          <div className="p-2">
            <div className="flex items-center">
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Your Home Connects frontpage. Come here to check in with your
              favorite communities!
            </p>
            <Separator className="my-5" />
            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/test/create">Create Post</Link>
              </Button>
              
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
