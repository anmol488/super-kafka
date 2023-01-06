"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import unstable_getServerSession from "next-auth";
import { Event } from "../utils/events";

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

export default function EventModal({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [name, setName] = useState("");
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const createEvent = async () => {
    event?.preventDefault();

    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(name) || name.length > 25 || name == "") {
      toast.error("Please enter a valid event name of 25 chars max");
      return;
    }

    if (month > 12 || month <= 0) {
      toast.error("Please enter a valid month number");
      return;
    }

    if (date > 31 || date <= 0) {
      toast.error("Please enter a valid date");
      return;
    }

    if (desc.length > 200) {
      toast.error("Please enter an event description of 200 chars max");
      return;
    }

    const newEvent: Event = {
      member: session.user?.name,
      name: name,
      month: month,
      date: date,
      desc: desc,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      await addDoc(collection(db, "events"), newEvent);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
    closeModal();
    toast.success("Event has been successfully created!");
  };

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <Toaster position="top-center" reverseOrder={false} />
        <button
          type="button"
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Create Event
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
                      <h1 className="h1">Create an event</h1>
                      <div className="flex flex-wrap -mx-3 mb-4 mt-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-800 text-sm font-medium mb-1">
                            Event Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter planned event name"
                            required
                            onChange={(event) => {
                              setName(event.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-4 mt-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-800 text-sm font-medium mb-1">
                            Month
                          </label>
                          <input
                            id="name"
                            type="number"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter planned month number of event"
                            required
                            onChange={(event) => {
                              setMonth(event.target.valueAsNumber);
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-4 mt-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-800 text-sm font-medium mb-1">
                            Date
                          </label>
                          <input
                            id="name"
                            type="number"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter planned date of event"
                            required
                            onChange={(event) => {
                              setDate(event.target.valueAsNumber);
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
                            placeholder="Describe everything about your event"
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
                            onClick={createEvent}
                          >
                            {loading ? "Loading..." : "Create"}
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
