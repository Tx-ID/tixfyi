'use client'

import { OsuIcon } from "@/components/osu.js"
import { useEffect, useState } from "react"
import Image from 'next/image'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertText, setAlert] = useState("");

  return (
    <div className='flex justify-center align-middle items-center'>
      <div className="absolute inset-0 z-0">
        <Image alt="Background" src="/background.jpg" style={{objectFit: "cover"}} fill={true} className='opacity-5'></Image>
      </div>
      <div id="alert" className={"z-10 absolute alert max-w-xl " + (isOpen ? "" : "alert-closed")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{alertText}</span>
        <div>
          <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-primary">OK</button>
        </div>
      </div>
      <div className="bg-base-200 flex flex-col max-w-3xl rounded-xl items-center z-10 relative">
        <div className="rounded-xl bg-black z-10">
          <video id="video" className="rounded-xl rounded-b-none bg-black" src={'/video.mp4'} autoPlay muted loop playsInline disablePictureInPicture></video>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-center mt-4 mb-4 z-20">
          <a href="https://github.com/Tx-ID" className="btn btn-sm btn-neutral">
            <Image id="white" alt="Github" className="h-4 w-4" width={4} height={4} src="/svg/github.svg" />
            <p>GITHUB</p>
          </a>
          <button onClick={() => { setAlert("Discord username has been copied to clipboard."); setIsOpen(true); navigator.clipboard.writeText("tix1"); }} className="btn btn-sm btn-neutral">
            <Image id="white" alt="Discord" className="h-4 w-4" width={4} height={4} src="/svg/discord.svg" />
            <p>DISCORD</p>
          </button>
        </div>
      </div>
    </div>
  );
}
