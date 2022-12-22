import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1528812",
  key: "d2847ed0774792a241f6",
  secret: "c0edb2a2a62b92105888",
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("d2847ed0774792a241f6", {
  cluster: "ap2",
  forceTLS: true,
});
