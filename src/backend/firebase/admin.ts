import * as admin from 'firebase-admin'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// console.log(admin.apps.length)

const getAdmin = (): admin.app.App => {
  if (admin.apps.length === 0) {
    return admin.initializeApp({
      credential: applicationDefault(),
    })
  }

  return admin.apps[0]
}

const app = getAdmin()
export const auth = getAuth(app)
