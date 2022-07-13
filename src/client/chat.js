import { database } from "@/firebase/firebase";
import { ref, set, push } from "firebase/database";
import { DateTime } from "luxon";
import { updateProjectModified } from "@/client/project";
export const sendMessage = (projectID, text, staff) => {
    const message = {
        date: DateTime.now(),
        text: text,
        staff: staff,
    };
    const chatRef = ref(database, `chats/${projectID}`);
    const newMessageRef = push(chatRef);
    set(newMessageRef, message);
    updateProjectModified(projectID);
};
//# sourceMappingURL=chat.js.map