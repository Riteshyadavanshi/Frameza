import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="w-screen bg-slate-900 sticky  top-0 z-10">
      <div className="flex items-center  bg-slate-900">
        <Image
          src={"/logo.png"}
          alt="logo"
          height={400}
          width={400}
          className="size-20"
        />
        <h1 className="text-white text-2xl font-bold -mt-4">Frameza</h1>
      </div>
    </nav>
  );
};
