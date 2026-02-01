import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthBtn } from "./_component/Auth-btn";

const AuthPage = () => {
  
  return (
    <main className="bg-white min-h-screen flex ">
      {/* Left Side */}
      <section className="flex-1 bg-red-400 hidden md:block relative">
        <video
          src={"./auth-video.mp4"}
          loop
          muted
          autoPlay
          className="min-h-full aspect-video object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 flex-1">
          <div className="bg-black/40 h-full flex justify-center items-center">
            <div className="space-y-4">
              <h1 className="text-white text-4xl">Create Video with AI</h1>
              <p className="text-xl text-muted">
                {" "}
                Sign in to continue building with Frameza
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex-1 justify-center items-center flex">
        <Card className="max-w-[350px] w-full ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              {" "}
              Sign in to continue building with Frameza
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthBtn />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AuthPage;
