import React from 'react'
import NavigateBar from '../../root/Components/NavigateBar/NavigateBar'
import SliderBanner from '@/root/Components/SliderBanner/SliderBanner'
import UgCakesSearchFeatures from '@/root/Components/q/UgCakesSearchFeatures'

const Home = () => {
  return (
    <div className="">
      <NavigateBar/>
      <SliderBanner/>
      <UgCakesSearchFeatures/>
    </div>
  )
}

export default Home