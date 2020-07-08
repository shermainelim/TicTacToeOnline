import * as firebaseAdmin from 'firebase-admin';

const admin = firebaseAdmin.initializeApp();

export const firestore = admin.firestore();
