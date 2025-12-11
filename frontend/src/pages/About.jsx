import React from 'react'
import Title from "../components/Title"
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from "../components/NewsLetterBox"
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
<Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
<img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
<div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
<p>gdb2ednkbdhhgsdguhijgegidj2bd df2fyyhdwbd</p>
<p>gdb2ednkbdhhgsdguhijgegidj2bd df2fyyhdwbd</p>
<b className='text-gray-800'>OUR MISSION</b>
<p>fdydhd2 tuud2ldlbs djwdggfjeewufwe wnfgewwhfjewif ewgfuiilweuufiewnegfwelioewdwjfcweyf</p>
</div>
      </div>
      <div className='text-xl py-4'>
<Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>QUALITY ASSURANCE:</b>
  <p classname="text-gray-600">We select each product so it matches our stamndard</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>CONVINIENCE:</b>
  <p classname="text-gray-600">We select each product so it matches our stamndard</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>EXCEPTIONAL CUSTOMER SERVICE:</b>
  <p classname="text-gray-600">We select each product so it matches our stamndard</p>
</div>

      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About