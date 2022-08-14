import Navbar from '../components/navbar'

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="max-w-3xl">
      <Navbar />
      {children}
    </div>
  )
}
