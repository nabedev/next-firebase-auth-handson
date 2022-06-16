import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const app = initializeApp({
  credential: applicationDefault(),
})

const auth = getAuth(app)

export {
  app,
  auth
}
