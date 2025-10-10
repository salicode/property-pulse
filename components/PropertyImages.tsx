import React from 'react'
import Image from 'next/image'

interface PropertyImagesProps {
  images: string[];
}

const PropertyImages: React.FC<PropertyImagesProps> = ({ images }) => {
  return (
    <section className="bg-blue-50 px-4">
  <div className='container mx-auto'>
  {
    images.length === 1 ? (
      
        <Image src={images[0]}
         priority={true}
         alt="" width={1800} height={400} className='object-cover h-[400px] mx-auto rounded-lg ' />
      
    ) : (
       <div className='grid grid-cols-2 gap-4'>
        {images.map((image, index) => (
        <div key={index} className={`${images.length === 3 && index === 2 ? 'col-span-2' : 'col-span-2'}`}> 
          <Image src={image}
         priority={true}
         alt="" width={1800} height={400} 
         
         className='object-cover h-[400px] width-full rounded-lg ' />
        </div>
      ))}
       </div>
    )
  }
   
  </div>
    </section>
  )
}

export default PropertyImages
