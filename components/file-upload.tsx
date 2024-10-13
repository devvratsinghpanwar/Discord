"use client";
import React from "react";
import { X} from 'lucide-react'
import Image  from'next/image'
import { UploadDropzone } from "../lib/uploadthing";
import "@uploadthing/react/styles.css";
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {

    const fileType = value?.split(".").pop();
    if (value && fileType !== "pdf" && fileType !== "audio" && fileType !== "video") {
       return(
        <div className="relative h-20 w-20">
        <Image
        alt="server Image"
        fill
        src={value}
        className="rounded-full"
        />
        <button
        onClick={()=>onChange("")}
        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        type="button"
        >
            <X className="w-4 h-4"/>
        </button>
       </div>
       )
    }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
