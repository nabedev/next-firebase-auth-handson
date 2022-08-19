import type { User } from 'firebase/auth'
import { useApolloClient } from '@apollo/client'
import { FC, useContext } from 'react'

import { auth } from '../firebase'
import { AuthContext } from '../contexts/AuthContext'

const Navbar: FC = () => {
  const user = useContext(AuthContext)

  const displayNameShort = user?.displayName?.charAt(0) || '👾'
  const client = useApolloClient()

  return (
    <div className="navbar bg-base-100 justify-end">
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            className="tooltip tooltip-bottom"
            data-tip={user?.displayName || 'Anonymous'}
          >
            <label
              tabIndex={0}
              className="btn btn-circle avatar online normal-case"
            >
              <span>{displayNameShort}</span>
            </label>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                onClick={() => {
                  auth.signOut()
                  client.resetStore()
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
