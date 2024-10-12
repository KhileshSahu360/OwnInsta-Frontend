import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = ({colors=['white','white','white','white','white']}) => {
  return (
    
  <ColorRing
    visible={true}
    height="30"
    width="30"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={colors}
    />
  )
}

export default Loader