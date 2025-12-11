import React from 'react'
import hero_img from '../assets/frontend_assets/hero_img.png'
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
{/* Hero section left side */}
<div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
<div className='text-[#414141]'>
    <div className='flex items-center gap-2'>
        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
<p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
    </div>
<h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>LATEST ARRIVALS</h1>
<div className='flex items-center gap-2'>
<p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
<p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
</div>
</div>

</div>
{/* Right hero side */}

<img className='w-full sm:w-1/2'  src={hero_img} alt=''/>
    </div>
  )
}

export default Hero