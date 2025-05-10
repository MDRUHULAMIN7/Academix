"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { updateCourse } from "@/app/actions/course";
import { useRouter } from "next/navigation";
const IMGBB_API_KEY = "d53f3570374958485f29630fbf77e0b9"; // Replace with your actual API key

export const ImageForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialData?.thumbnail || "");
  const [isUploading, setIsUploading] = useState(false);
   const router = useRouter();
  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true); // Show uploading status
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1];
      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", base64String);

      try {
        const res = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        const imageUrl = data?.data?.url;

        

        if (imageUrl) {
          setPreviewUrl(imageUrl);
        const thumbnail = { thumbnail: imageUrl };
          await updateCourse(courseId,thumbnail );
          toggleEdit();
          toast.success("Image uploaded successfully!");
          router.refresh();
        } else {
          toast.error("Upload failed.");
        }
      } catch (error) {
        toast.error("Upload to ImgBB failed.");
      } finally {
        setIsUploading(false); // Reset upload status
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-6">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? "Cancel" : initialData?.thumbnail ? (
            <>
              <Pencil className="h-4 w-4 mr-2 text-black" />
              Edit image
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2 text-black" />
              Add an image
            </>
          )}
        </Button>
      </div>

      {/* Display preview if image is uploaded */}
      {!isEditing ? (
        !previewUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md border border-dashed border-slate-300">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Uploaded"
              fill
              className="object-cover rounded-md"
              src={previewUrl}
            />
          </div>
        )
      ) : (
        <div className="mt-4">
          {/* Custom file input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-700
                       file:mr-4 file:py-3 file:px-6
                       file:rounded-xl file:border-2 file:border-slate-300
                       file:text-sm file:font-semibold
                       file:bg-slate-100 file:text-slate-700
                       hover:file:bg-slate-200 hover:file:border-slate-400
                       focus:file:border-sky-500 focus:file:outline-none"
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}

      {/* Uploading indication */}
      {isUploading && (
        <div className="mt-4 text-sm text-yellow-600">
          <span>Uploading...</span>
        </div>
      )}
    </div>
  );
};
