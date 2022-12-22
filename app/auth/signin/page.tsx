import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://res.cloudinary.com/dcqjb4hp2/image/upload/v1671723438/161_cuzlkt.png"
          alt="Brand Logo"
        />
      </div>

      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;
