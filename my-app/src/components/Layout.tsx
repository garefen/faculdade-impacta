import Navbar from '@/components/Navbar'

export default function Layout(prop: any) {
  const {children} = prop;

  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}
