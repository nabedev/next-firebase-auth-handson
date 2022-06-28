import * as admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'

const getAdmin = (): admin.app.App => {
  if (admin.apps.length === 0) {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  }

  return admin.apps[0] as admin.app.App
}

const app = getAdmin()
export const auth = getAuth(app)
