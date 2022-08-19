import Navbar from '../components/navbar'

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="container max-w-3xl p-2.5">
      <Navbar />
      {children}
    </div>
  )
}
