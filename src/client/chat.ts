import { database } from "@/firebase/firebase";
import { ref, set, push } from "firebase/database";
import type { Message } from "@/model/model";
import { DateTime } from "luxon";
import { updateProjectModified } from "@/client/project";

export const sendMessage = (
  projectID: string,
  text: string,
  staff: boolean
) => {
  const message: Message = {
    date: DateTime.now(),
    text: text,
    staff: staff,
  };

  const chatRef = ref(database, `chats/${projectID}`);
  const newMessageRef = push(chatRef);
  set(newMessageRef, message);

  updateProjectModified(projectID);
};
