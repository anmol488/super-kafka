"use client";

import Request from "./Request";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ValidationComponent() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateTeamMember = () => {
    event?.preventDefault();

    if (password !== "wolves32") {
      toast.error("Sorry! Wrong password.");
    }

    if (password == "wolves32") {
      setLoading(true);
      router.push("/auth/signin");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12 md:pb-20">
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h1 className="h1">
            To keep our chat logs confidential, please enter the assigned
            password to continue.
          </h1>
        </div>

        <div className="max-w-sm mx-auto">
          <form>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <input
                  id="password"
                  type="password"
                  className="form-input w-full text-gray-800"
                  placeholder="Enter password"
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <Toaster position="bottom-center" reverseOrder={false} />

            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                <button
                  type="submit"
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  onClick={validateTeamMember}
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
              </div>
            </div>
          </form>
          <div className="flex items-center my-6">
            <div
              className="border-t border-gray-300 flex-grow mr-3"
              aria-hidden="true"
            ></div>
            <div className="text-gray-600 italic">
              Not a leadership team member?
            </div>
            <div
              className="border-t border-gray-300 flex-grow ml-3"
              aria-hidden="true"
            ></div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <Request />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full">
                Give feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidationComponent;
