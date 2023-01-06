import Image from "next/image";
import React from "react";
import LogoutButton from "./LogoutButton";
import unstable_getServerSession from "next-auth";

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function Header({ session }: Props) {
  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            src={session.user?.image!}
            height={10}
            width={50}
            alt="Profile Picture"
            className="rounded-full mx-2 object-contain"
          />

          <div>
            <p>Logged in as:</p>
            <p className="font-bold text-md">{session.user?.name}</p>
          </div>
        </div>

        <LogoutButton />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://res.cloudinary.com/dxo0clghf/image/upload/v1672994981/dia-logo_o7kiua.png"
            height={10}
            width={50}
            alt="Logo"
            className="rounded-xl"
          />
          <p className="font-bold">Welcome to SuperKafka. The home of DIA events!</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
