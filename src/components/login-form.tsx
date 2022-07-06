import {
  GithubAuthProvider,
  signInAnonymously,
  signInWithRedirect,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'

const LoginForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const user = useContext(AuthContext)
  const router = useRouter()

  if (user) {
    router.push('/')
  }

  if (loading) return <p>Loading...</p>

  const loginWithGithub = async () => {
    setLoading(true)
    const provider = new GithubAuthProvider()
    await signInWithRedirect(auth, provider)
    setLoading(false)
  }

  const loginWithAnonymously = async () => {
    setLoading(true)
    await signInAnonymously(auth)
    setLoading(false)
  }

  return (
    <div className="container max-w-md text-center">
      <div className="flex h-screen">
        <div className="m-auto">
          <h1 class="text-5xl font-bold">Please Log in!</h1>
          <p class="py-6">This certification uses Firebase Authentication!</p>
          <div class="flex flex-col w-full border-opacity-50">
            <button
              className="btn btn-lg btn-primary normal-case gap-2"
              onClick={loginWithAnonymously}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              Continue with Anonnimously
            </button>

            <div class="divider">OR</div>
            <button
              className="btn btn-lg normal-case gap-2"
              onClick={loginWithGithub}
            >
              <svg
                aria-label="github"
                height="20"
                viewBox="0 0 14 14"
                width="20"
              >
                <path
                  d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                  fill="currentColor"
                  fill-rule="nonzero"
                ></path>
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
