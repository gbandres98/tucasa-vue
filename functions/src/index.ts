import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

admin.initializeApp();

export const addRoleOnSignup = functions
  .region("europe-west3")
  .auth.user()
  .onCreate(async (user) => {
    if (!user.email) return;

    const customClaims = {
      role: "STAFF",
    };

    try {
      await getAuth().setCustomUserClaims(user.uid, customClaims);
    } catch (e: unknown) {
      console.log(e);
    }
  });

export const getStaffList = functions
  .region("europe-west3")
  .https.onCall(async (data, context) => {
      if (context.auth?.token)
    });
