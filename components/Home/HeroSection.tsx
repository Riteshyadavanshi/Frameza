import { ArrowUpRight, Sparkles } from "lucide-react";
import { BoxesCore } from "../ui/background-boxes";
import { RedirectBtn } from "../ActionBtn/RedirectBtn";

export const HeroSection = () => {
  return (
    <>
      <section className="max-w-6xl  overflow-hidden mx-auto px-4 py-12 md:py-24 space-y-12  z-10 relative ">
        <BoxesCore className="-z-1" />
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="size-4" />
            <span>Next-Gen AI Motion</span>
          </div>
          <h1 className="text-white text-4xl font-bold md:text-6xl tracking-tight text-balance">
            Transform <span className="text-indigo-500">Images</span> and{" "}
            <span className="text-indigo-500">Text</span> into Cinematic Video
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto text-pretty">
            Bring your static concepts to life with our advanced AI video
            engine. Upload an image or describe your scene to begin
          </p>
          <RedirectBtn
            url="/chat"
            className="bg-white text-black hover:bg-white cursor-pointer"
          >
            Get Started <ArrowUpRight />
          </RedirectBtn>
          <RedirectBtn
            url="/subscription"
            className="bg-indigo-900 text-white   hover:bg-indigo-900/80 cursor-pointer ml-4"
          >
            See Plans <ArrowUpRight />
          </RedirectBtn>
        </div>
      </section>

      <section className="w-screen px-12 space-y-4">
        <div className="flex justify-center ">
          <h1 className="text-white font-bold text-3xl md:text-4xl">
            See Demo
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  ">
          <video src="/demo.mp4" autoPlay loop muted controls />
          <video src="/demo.mp4" autoPlay loop muted controls />
          <video src="/demo.mp4" autoPlay loop muted controls />
          <video src="/demo.mp4" autoPlay loop muted controls />
          <video src="/demo.mp4" autoPlay loop muted controls />
          <video src="/demo.mp4" autoPlay loop muted controls />
        </div>
      </section>
    </>
  );
};
