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
import { useEffect, useState } from "react"

import { FaImage } from "react-icons/fa";
import Loader from "./Loader"
import toast, { Toaster } from "react-hot-toast"

import { useSelector } from "react-redux"
import axios from "axios"


export function CreatePost() {
  const { accessToken, pageId, pageAccessToken } = useSelector((store)=>store.tokenSlice)
  const [caption, setCaption] = useState('')
  const [imagePreview, setImagePreview] = useState('');
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null)

  const [message, setMessage] = useState("");
  const [convertedImage, setConvertedImage] = useState(null);

  const handleFileChange = (event) => {
    console.log('helllo')
    const file = event.target.files[0];
    setFile(file)
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  
   const handleSubmit = async(event) => {
     event.preventDefault();    
     setLoader(true)
     if(!imagePreview || !caption){
        toast.error('please fill all require field!'); 
        return
      } 
      
      postToInsta();
   }

   const postToInsta = async() => {
    if(!accessToken) return
    // const image_url = `${file.name}`
    validateAndConvertImage(file);
    await uploadImageToCloudinary();
 }

 const uploadImageToCloudinary = async() => {
  const formData = new FormData();
  formData.append('file', file)
  formData.append('upload_preset','insta_post')

  let cloudinaryImageUrl;

  axios.post(`https://api.cloudinary.com/v1_1/dbjjimuui/image/upload`, formData)
  .then((response) => {

     post(response.data.secure_url)
  })
  .catch((error) => {
    console.error('Error uploading image:', error);
    setLoader(false)
  });
  
}


   const post = async(cloudinaryImageUrl) => {
      try {
        if(cloudinaryImageUrl){
          console.log('chalaaa')
          const createMedia = await axios.post(`https://graph.facebook.com/v20.0/17841470084140247/media`, {
            image_url : `${cloudinaryImageUrl}`,
            caption,
            access_token: `${accessToken}`
          });
      
          const mediaId = createMedia.data.id;
      
          const publishMedia = await axios.post(`https://graph.facebook.com/v17.0/17841470084140247/media_publish`, {
              creation_id: mediaId,
            access_token: `${accessToken}`
          });
    
          const realPageId = pageId || localStorage.getItem('page_id');
          const ralPageAccessToken = pageAccessToken || localStorage.getItem('page_access_token');
    
          const createFacebookMedia = await axios.post(`https://graph.facebook.com/v20.0/${realPageId}/photos`, {
            url: `${cloudinaryImageUrl}`, // The URL of the image you want to post to Facebook
            caption, // Caption for the Facebook post
            access_token: `${ralPageAccessToken}`
        });
    
    
    
    
        console.log(createFacebookMedia)
    
       
        
        if(publishMedia?.data?.id){
            console.log(publishMedia); toast.success('post successfully created!')
            setLoader(false)
            setImagePreview(null)
            setCaption('')
          } 
        }
      } catch (error) {
        console.log(error)
        if(createFacebookMedia.status !== 200){
          setLoader(false)
          toast.error('error while uploading the image on facebook!')
        }else{
          toast.error('error while uploading the image!')
        }
        setLoader(false)
      }
   }


   const resizeImage = (image, maxWidth, maxHeight) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let width = image.width;
    let height = image.height;

    // Maintain aspect ratio while resizing
    if (width > maxWidth || height > maxHeight) {
      const aspectRatio = width / height;
      if (aspectRatio > 1) {
        width = maxWidth;
        height = maxWidth / aspectRatio;
      } else {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    return canvas;
  };

  const validateAndConvertImage = (file) => {
    // Ensure file format is JPEG
    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      setMessage("Invalid file format! Must be JPEG.");
      return false;
    }

    // File size check (8 MB limit)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 8) {
      setMessage("File size exceeds 8 MB limit.");
      return false;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      const aspectRatio = width / height;

      // Ensure the aspect ratio falls within 4:5 to 1.91:1
      const minAspectRatio = 4 / 5;
      const maxAspectRatio = 1.91;
      if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
        setMessage(`Aspect ratio is ${aspectRatio.toFixed(2)}, which is out of range. Resizing and adjusting.`);
        // Adjust the size and aspect ratio
        const newCanvas = resizeImage(image, 1440, 1440 / minAspectRatio);
        const convertedDataUrl = newCanvas.toDataURL("image/jpeg", 0.9);
        setConvertedImage(convertedDataUrl);
      } else {
        setMessage("Image is valid. Resizing if necessary.");
        // Resize if needed, but maintain aspect ratio
        const newCanvas = resizeImage(image, 1440, 1440 / minAspectRatio);
        const convertedDataUrl = newCanvas.toDataURL("image/jpeg", 0.9);
        setConvertedImage(convertedDataUrl);
      }
    };
  };


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
         <label htmlFor="" className="cursor-pointer m-0">Create Post</label>
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
          <Button type="submit" className="px-8 bg-pink-700 hover:bg-pink-500 text-white">{loader?<Loader/>:'Post'}</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}
