import { Fragment, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../../lib/firebase";

const events = [
  { name: "Secondary School Debate" },
  { name: "Academic Olympiad" },
  { name: "Science Fair" },
  { name: "Christmas Carols" },
  { name: "Diwali Fest" },
  { name: "National Day Assembly" },
];

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState(events[0]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const sendFeedback = async () => {
    event?.preventDefault();

    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(name)) {
      toast.error("Please enter a valid name");
      return;
    }

    if (!email.includes("@diaestudents.com")) {
      toast.error("Please enter a valid DIA email");
      return;
    }

    if (feedback.length > 200) {
      toast.error("Please enter 200 chars max");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "feedback"), {
        name: name,
        email: email,
        event: selected,
        eventFeedback: feedback,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      alert(error);
    }
    setLoading(false);
    closeModal();
    toast.success("Feedback has been successfully sent!");
  };

  <Toaster position="bottom-center" reverseOrder={false} />;

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full"
        >
          Give your feedback on a past event
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-1" onClose={closeModal}>
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

                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium">
                          Choose the event you wish to give feedback on:
                        </label>
                      </div>
                      <div className="top-16 w-72">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full border border-gray-300 cursor-pointer bg-white rounded py-3 px-4 pl-3 pr-10 text-left focus:outline-none text-sm">
                              <span className="block truncate">
                                {selected.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {events.map((event, eventIdx) => (
                                  <Listbox.Option
                                    key={eventIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-3 pl-10 pr-4 ${
                                        active
                                          ? "bg-blue-100 text-gray-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={event}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {event.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-4 mt-4">
                        <div className="w-full px-3">
                          <div className="flex justify-between">
                            <label className="block text-gray-800 text-sm font-medium mb-1">
                              Feedback
                            </label>
                          </div>
                          <textarea
                            id="feedback"
                            rows={5}
                            className="form-input w-full text-gray-800 resize-none"
                            placeholder="What did you like and didn't like about the selected event?"
                            required
                            onChange={(event) => {
                              setFeedback(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button
                            type="submit"
                            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                            onClick={sendFeedback}
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
