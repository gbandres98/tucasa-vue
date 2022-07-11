import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { firestore } from "firebase-admin";

admin.initializeApp();

export const addRoleOnSignup = functions
  .region("europe-west3")
  .auth.user()
  .onCreate(async (user) => {
    if (!user.email) return;

    const customClaims = {
      role: "USER",
    };

    try {
      await getAuth().setCustomUserClaims(user.uid, customClaims);
    } catch (e: unknown) {
      console.log(e);
    }
  });

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
