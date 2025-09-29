import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/hero'
// import LatestCollection from '../components/LatestCollection'

import TestimonialCarousel from '../components/ListTestimonials'
import Faq from '../components/Faq'
import FeaturedEmployeesSection from '../components/FeaturedEmployeesSection'

import NewsletterSubscribe from '../components/NewsletterSubscribe'
import Service from '../components/Service'
import About from '../components/About'

function Home() {
  return (
    <div>
  
   <Hero/>
   <About/>
   <Service/>
   {/* <LatestCollection/> */}
  
   <FeaturedEmployeesSection/>
   <TestimonialCarousel/>
   <Faq/>
   <NewsletterSubscribe/>
   
  
    </div>
  )
}

export default Home
