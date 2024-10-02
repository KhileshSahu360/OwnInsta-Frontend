import Card from '@/components/Card'
import React from 'react'

const AllPosts = () => {
  return (
    <div className=' '>

      <div className='p-4 ml-4'>
        <label htmlFor="" className='font-bold text-[1.2rem]'>My Profile</label>

        <div className='mt-4 flex gap-10'>
          <div className='flex gap-2 flex-col items-center justify-center'>
            <img className='rounded-full size-[100px]' src="data:image/jpeg;base64,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" alt="" />
            <label htmlFor="" className='font-semibold'>Khilesh Sahu</label>
          </div>
          <div className='flex gap-10'>
          <div className='flex flex-col items-center justify-center'>
            <label htmlFor="" className='font-semibold'>59</label>
            <label htmlFor="">posts</label>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <label htmlFor="" className='font-semibold'>634</label>
            <label htmlFor="">followers</label>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <label htmlFor="" className='font-semibold'>599</label>
            <label htmlFor="">following</label>
          </div>
          </div>
        </div>

        <div className='flex -mt-1 pl-1 flex-col'>
              <label htmlFor="" className='m-0 text-[.8rem]'>Curious coder</label>
              <label htmlFor="" className='m-0 text-[.8rem]'>programmer </label>
              <label htmlFor="" className='m-0 text-[.8rem]'>code </label>
              <label htmlFor="" className='m-0 text-[.8rem]'>king programmer</label>
            </div>
      </div>

      {/* card */}
      <div className='ml-5 mt-1 '>
        <label htmlFor="" className='font-semibold text-[1.2rem]'>My post</label>
      </div>
      <div className='w-full p-4 grid grid-cols-4 place-items-center'>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
    </div>
  )
}

export default AllPosts