import Navbar from './navbar'

export default function DefaultLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="m-auto text-center">{children}</div>
    </div>
  )
}
