import Navbar from '../components/navbar'

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="m-auto text-center">{children}</div>
    </div>
  )
}
