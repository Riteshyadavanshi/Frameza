import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface MessageBubble {
  role: Role;
  prompt: string;
  imageUrl?: string;
  videoUrl?: string;
  isLoading: boolean;
}

export enum Role {
  USER = "user",
  AI = "ai",
}

export function parseBase64Image(dataUrl: string) {
  const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);

  if (!matches) {
    throw new Error("Invalid base64 image format");
  }

  return {
    mimeType: matches[1],               
    bytesBase64Encoded: matches[2],      
  };
}
