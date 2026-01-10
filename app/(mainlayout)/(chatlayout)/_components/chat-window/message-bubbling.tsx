import { Card } from "@/components/ui/card";
import { cn, MessageBubble, Role } from "@/lib/utils";
import { ArrowDown, Download, Loader2 } from "lucide-react";
import Image from "next/image";

export const MessageBubbling = (message: MessageBubble) => {
  const isUser = message.role === Role.USER;
  return (
    <div className={cn(`flex ${isUser ? "justify-end" : "justify-start"}`)}>
      <Card
        className={`max-3xl p-4 
          ${
            isUser
              ? "bg-indigo-600 text-white"
              : "bg-neutral-900 text-neutral-200"
          }
        `}
      >
        {message.prompt && (
          <p className="text-sm whitespace-pre-wrap">{message.prompt}</p>
        )}
        {message.imageUrl && (
          <Image
            src={message.imageUrl}
            alt={message.imageUrl}
            width={200}
            height={200}
            className="size-50"
          />
        )}

        {message.isLoading && (
          <div className="flex items-center gap-2 text-neutral-400 mt-2 animate-pulse">
            <Loader2 className="animate-spin" />
            Generating Video ...
          </div>
        )}

        <div>
          {message.videoUrl && (
            <video
              src={message.videoUrl}
              controls
              className="mt-3 rounded-lg object-fill size-[400px]"
            />
          )}
          <div className="bg-white w-30 rounded-lg p-2  mt-4">
            <a
              href={message.videoUrl}
              download={true}
              className="text-black flex items-center"
            >
              Download <Download size={20} className="ml-4" />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};
