"use client";

import { MessageBubble, Role } from "@/lib/utils";
import { MessageBubbling } from "../_components/chat-window/message-bubbling";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Video, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const ChatPage = () => {
  const [chats, setChats] = useState<MessageBubble[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const message: MessageBubble = {
    role: Role.AI,
    prompt: "create a animal video",
    isLoading: false,
    videoUrl: "/demo.mp4",
  };

  const removeImage = () => {
    setImageUrl("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (f) => {
        setImageUrl(f.target?.result as string);
      };
      fileReader.readAsDataURL(file);
    }
    console.log("please select any file");
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    chatMessage();

    cleanUp();
    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, imageUrl }),
      });

      if (!response.ok) {
        alert("Something went wrong!");
        return;
      }

      const data = await response.json();

      setChats((prev) => {
        return prev.slice(0, chats.length - 1);
      });
      setChats((pre) => [
        ...pre,
        {
          videoUrl: data.videoUrl,
          isLoading: false,
          prompt: "Video generated",
          role: Role.AI,
        },
      ]);
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  };

  const chatMessage = () => {
    setChats((prev) => {
      return [
        ...prev,
        {
          role: Role.USER,
          prompt,
          imageUrl,
          isLoading: false,
        },
        {
          role: Role.AI,
          prompt: "",
          isLoading: true,
          videoUrl: "",
        },
      ];
    });
  };

  const cleanUp = () => {
    setImageUrl("");
    setPrompt("");
  };
  return (
    <>
      {chats.length > 0 && (
        <div className="h-[500px] max-h-[500px] overflow-y-auto px-8 py-4">
          {chats.map((chat) => (
            <>
              <MessageBubbling {...chat} key={chat.role} />
            </>
          ))}
        </div>
      )}
      <div
        className={`py-4 ${!chats.length ? "h-full" : ""} px-8 flex flex-col ${
          !chats.length ? " justify-center" : "justify-end"
        } `}
      >
        {!chats.length && (
          <h1 className="text-3xl text-white text-center mb-4">
            What’s on your mind today?
          </h1>
        )}
        <div>
          <div
            className="max-w-3xl mx-auto rounded-2xl
          p-4 bg-neutral-950  space-y-4
       "
          >
            {imageUrl && (
              <div className="bg-neutral-800 size-50 p-2 rounded-lg  relative">
                <Button
                  className="absolute right-4 bg-neutral-800 hover:bg-neutral-700 cursor-pointer"
                  onClick={removeImage}
                >
                  <X />
                </Button>
                <Image
                  src={imageUrl}
                  alt={imageUrl}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            )}
            <div className="flex gap-3 items-center">
              <Input
                onChange={handleImageUpload}
                type="file"
                id="image"
                className="hidden"
              />

              <Textarea
                placeholder="Describe the motion for your video.."
                className="text-white"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                className="size-15 px-6 gap-2"
                onClick={handleGenerate}
                disabled={!prompt}
              >
                <Video className="size04" />
              </Button>
            </div>

            <label
              htmlFor="image"
              className="bg-neutral-900 w-50 text-white flex items-center justify-center p-2 rounded-2xl"
            >
              <Plus /> Image
            </label>
            <Input type="file" id="image" className="hidden" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
