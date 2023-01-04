import { Dialog, Transition } from "@headlessui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../../lib/firebase";

export default function Request() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [yrLvl, setYrLvl] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    event?.preventDefault();

    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const num = /\d/;
    if (format.test(name)) {
      toast.error("Please enter a valid name");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    if (yrLvl.length < 2 || !num.test(yrLvl)) {
      toast.error("Please enter a valid year level");
      return;
    }

    if (desc.length > 200) {
      toast.error("Please enter 200 chars max in description");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "requests"), {
        name: name,
        email: email,
        yearLevel: yrLvl,
        eventDescription: desc,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      alert(error);
    }
    setLoading(false);
    closeModal();
    toast.success("Request has been successfully sent!");
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full"
        >
          Send us an event request
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <form>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-800 text-sm font-medium mb-1">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your full name"
                            required
                            onChange={(event) => {
                              setName(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <div className="flex justify-between">
                            <label className="block text-gray-800 text-sm font-medium mb-1">
                              Email
                            </label>
                          </div>
                          <input
                            id="email"
                            type="email"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your DIA email"
                            required
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <div className="flex justify-between">
                            <label className="block text-gray-800 text-sm font-medium mb-1">
                              Year Level
                            </label>
                          </div>
                          <input
                            id="yrlvl"
                            type="text"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your year level"
                            required
                            onChange={(event) => {
                              setYrLvl(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <div className="flex justify-between">
                            <label className="block text-gray-800 text-sm font-medium mb-1">
                              Event description
                            </label>
                          </div>
                          <textarea
                            id="desc"
                            rows={5}
                            className="form-input w-full text-gray-800 resize-none"
                            placeholder="What event would you like to take place at DIA?"
                            required
                            onChange={(event) => {
                              setDesc(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button
                            type="submit"
                            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                            onClick={sendRequest}
                          >
                            {loading ? "Loading..." : "Send"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
