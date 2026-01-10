import { Footer } from "@/components/Home/Footer";
import { Navbar } from "@/components/Home/Navbar";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="w-screen min-h-screen bg-black">
        {/* Navbar */}
        <Navbar />
        <div className="min-h-screen">
          {/* Main Route */}
          {children}
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
