import Navbar from '../components/navbar'

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="container max-w-3xl">
      <Navbar />
      <div className="flex flex-col gap-y-10 items-center mt-12">
      {children}
      </div>
    </div>
  )
}
