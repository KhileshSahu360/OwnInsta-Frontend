import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
  return (
    
  <ColorRing
    visible={true}
    height="30"
    width="30"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['white','white','white','white','white']}
    />
  )
}

export default Loader