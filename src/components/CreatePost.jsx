import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import { FaImage } from "react-icons/fa";
import Loader from "./Loader"
import toast, { Toaster } from "react-hot-toast"



export function CreatePost() {
  const [caption, setCaption] = useState('')
  const [imagePreview, setImagePreview] = useState('');
  const [loader, setLoader] = useState(false);

  const handleFileChange = (event) => {
    console.log('helllo')
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  
   const handleSubmit = async(event) => {
    event.preventDefault();
    toast.success('post successfully created!')
    
   }
  return (
    <>
     <div>
     <Toaster
          position="top-center"
          reverseOrder={false}
        />
     </div>
      <Dialog>
      <DialogTrigger asChild>
         <label htmlFor="" className="cursor-pointer">Create Post</label>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action="" onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 mt-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="selectFile" className="cursor-pointer col-span-1 flex items-center justify-center ">
              <FaImage/>
            </label>
            {imagePreview && <img src={imagePreview} alt="" className="col-span-4" />}
            <input
              type="file"
              className="hidden"
              id="selectFile"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid grid-cols-4 mt-2 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Caption
            </Label>
            <input
              type="text"
              id="name"
              value={caption}
              onChange={(event)=>setCaption(event.target.value)}
              className="col-span-3 border-b outline-none focus:border-b-pink-700"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={()=>setLoader(!loader)} className="px-8 bg-pink-700 hover:bg-pink-500 text-white">{loader?<Loader/>:'Post'}</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}
