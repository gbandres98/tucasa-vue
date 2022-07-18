import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { firestore } from "firebase-admin";

const app = admin.initializeApp();

type IdEntity = {
  nextId: number;
};

export const saveProject = functions
  .region("europe-west3")
  .https.onCall(async (data) => {
    const project = data;

    const projectCollection = admin.firestore().collection("projects");

    if (project.id < 0) {
      const idDoc = admin.firestore().collection("ids").doc("projects");

      const idSnap = await idDoc.get();

      const idEntity = idSnap.data() as IdEntity;

      project.id = idEntity.nextId;

      await idDoc.update({
        nextId: firestore.FieldValue.increment(1),
      });
    }

    await projectCollection.doc(project.id.toString()).set(project);

    return project;
  });

type StaffRequest = {
  email: string;
  role: "USER" | "STAFF" | "ADMIN";
};

export const setRole = functions
  .region("europe-west3")
  .https.onCall(async (data) => {
    const req = data as StaffRequest;

    const user = await getAuth(app).getUserByEmail(req.email);

    if (user) {
      const customClaims = {
        role: req.role,
      };

      try {
        await getAuth().setCustomUserClaims(user.uid, customClaims);
      } catch (e: unknown) {
        console.log(e);
      }
    }

    return user;
  });

export const createUser = functions
  .region("europe-west3")
  .https.onCall(async (data) => {
    const req = data as StaffRequest;

    try {
      const user = await getAuth(app).createUser({
        email: req.email,
        emailVerified: true,
        password: (Math.random() + 1).toString(16).substring(2),
      });

      await getAuth().setCustomUserClaims(user.uid, {
        role: req.role,
      });

      return user;
    } catch (e: unknown) {
      console.log(e);

      throw e;
    }
  });

export const deleteUser = functions
  .region("europe-west3")
  .https.onCall(async (data) => {
    const req = data as StaffRequest;

    try {
      const user = await getAuth(app).getUserByEmail(req.email);

      await getAuth(app).deleteUser(user.uid);
    } catch (e: unknown) {
      console.log(e);

      throw e;
    }
  });
