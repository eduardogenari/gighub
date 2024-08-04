import Cover from '@/components/Cover'
import FeaturedEvents from '@/components/FeaturedEvents'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

export default function Page() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <FeaturedEvents />
      <Footer />
    </main>
  )
}
