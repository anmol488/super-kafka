import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Event = {
  member: string;
  name: string;
  month: number;
  date: number;
  desc: string;
  createdAt: Timestamp;
};

interface EventState {
  events: Event[];
}

const defaultEventState: EventState = {
  events: [],
};

export const eventState = atom<EventState>({
  key: "eventState",
  default: defaultEventState,
});
