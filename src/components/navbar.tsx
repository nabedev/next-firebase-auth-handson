import * as React from 'react'
import type { User } from 'firebase/auth'

import { auth } from '../firebase'

const Navbar: React.FC<{user: User | null | undefined}> = ({ user }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Simple TODO!</a>
      </div>
      <div className="navbar-end">
      {user ? <button className="btn btn-sm btn-outline" onClick={() => auth.signOut()}>Logout</button> : undefined }
      </div>
    </div>
  )
}

export default Navbar
