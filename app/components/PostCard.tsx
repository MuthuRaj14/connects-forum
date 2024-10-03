import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "../actions";
import { DownVote, UpVote } from "@/components/SubmitButtons";
import { TipTapReader } from "./TipTapRender";

interface iAppProps {
  title: string;
  jsonContent: any; // The JSON content from TipTapEditor
  id: string;
  subName: string;
  userName: string;
  imageString: string | null;
  voteCount: number;
}

export function PostCard({
  id,
  imageString,
  jsonContent,
  subName,
  title,
  userName,
  voteCount,
}: iAppProps) {
  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="UP" />
          <input type="hidden" name="postId" value={id} />
          <UpVote />
        </form>
        {voteCount}
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="DOWN" />
          <input type="hidden" name="postId" value={id} />
          <DownVote />
        </form>
      </div>

      <div className="flex-1 p-2">
        <div className="flex items-center gap-x-2">
          <p className="font-semibold text-xs">
            r/
          </p>
          <p className="text-xs text-muted-foreground">
            Posted by: <span className="hover: text-primary">u/{userName}</span>
          </p>
        </div>

        <div className="px-2">
            <h1 className="font-medium mt-1 text-lg">{title}</h1>
        </div>

        {imageString && (
          <div className="max-h-[300px] overflow-hidden my-2">
            <img
              src={imageString}
              alt="Post Image"
              width={600}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="px-2">
          {/* Render the content using TipTapReader */}
          {jsonContent && <TipTapReader json={jsonContent} />}
        </div>

        <div className="m-3 flex items-center gap-x-5">
         
          <CopyLink id={id} />
        </div>
      </div>
    </Card>
  );
}
