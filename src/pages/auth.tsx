import type { NextPage } from 'next'

const Auth: NextPage = () => {
  return (
    <main>
      Auth 🚀
      <label for="email">email</label>
      <input type="text" id="email" name="email" requiredminlength="4" maxlength="8" size="10" />
    </main>
  )
}

export default Auth