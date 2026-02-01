import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { parseBase64Image } from "@/lib/utils";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});
export async function POST(req: Request) {
  try {
    const userSession = await auth();
    const { prompt, imageUrl } = await req.json();

    const img = parseBase64Image(imageUrl);

    let operation = await ai.models.generateVideos({
      model: "veo-3.1-generate-preview",
      prompt,
      image: {
        imageBytes: img.bytesBase64Encoded,
        mimeType: img.mimeType,
      },
    });

    while (!operation.done) {
      console.log("Generating video , please wait...");
      await new Promise((r) => setTimeout(r, 8000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const videoUrl =
      operation?.response?.generatedVideos?.[0].video?.uri +
        "&key=" +
        process.env.GOOGLE_API_KEY! || "";
    const user = await prisma.user.findFirst({
      where: {
        id: userSession?.user?.id,
      },
    });

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        creadits: user?.creadits ? user.creadits - 10 : 0,
      },
    });
    return Response.json({ videoUrl });
  } catch (error) {
    console.log("Error occured while creating video", error);

    return Response.json(
      {
        error: "Error occured while creating video",
      },
      { status: 500 },
    );
  }
}
