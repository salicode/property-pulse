'use client'
import React from 'react'
import ClipLoader from 'react-spinners/CircleLoader';

const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "red",
  
};
const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <ClipLoader 
    color="#3b82f6" 
    loading={loading}
    size={150} 
    cssOverride={override}
    aria-label='Loading Spinner'
   
    />
  )
}

export default Spinner
