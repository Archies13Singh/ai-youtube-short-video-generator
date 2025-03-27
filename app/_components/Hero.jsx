import { Button } from '../../components/ui/button'
import React from 'react'

const Hero = () => {
  return (
    <div className='p-10 flex flex-col items-center justify-center -mt-24 md:px-20 lg:px-36 xl:px-48'>
        <h2 className='font-bold text-5xl text-center'>AI Youtube Short Video Generator</h2>
        <p className='text-gray-300 mt-4 text-center text-xl'>Create engaging, AI-generated YouTube Shorts with ease—perfect for content creators, marketers, and influencers.</p>
        <div className='mt-7 flex gap-8'>
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Explore</Button>
        </div>
    </div>
  )
}

export default Hero