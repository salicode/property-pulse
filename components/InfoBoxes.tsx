import React from 'react'
import InfoBox from './InfoBox'
const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
         <InfoBox
            heading="For Renters"
            backgroundColor="bg-grey-100"
            textColor="text-blue-800"
            buttonInfo={{ text: 'Browse Properties', link: '/properties', style: 'bg-black' }}
          >
            Looking for your next home? Explore a wide range of rental properties tailored to your needs. Whether you're seeking an apartment, condo, or house, we have options to suit every lifestyle and budget.
          </InfoBox>

           <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            textColor="text-blue-800"
            buttonInfo={{ text: 'Add Properties', link: '/properties/add', style: 'bg-blue-500' }}
          >
            Are you a property owner looking to rent out your space? List your property with us and reach a vast audience of potential renters. Our platform makes it easy to manage listings and connect with interested tenants.
          </InfoBox>
        
         
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes
