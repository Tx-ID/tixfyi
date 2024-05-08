'use client'

import { OsuIcon } from "@/components/osu.js"
import { useEffect, useState } from "react"
import Image from 'next/image'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertText, setAlert] = useState("");

  return (
    <main className="bg-base-200 flex flex-col max-w-3xl rounded-xl items-center">
      <div id="alert" className={"absolute alert max-w-xl " + (!isOpen ? "open" : "")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{alertText}</span>
        <div>
          <button onClick={() => { setIsOpen(false) }} className="btn btn-sm btn-primary">OK</button>
        </div>
      </div>

      <div className="rounded-xl bg-black">
        <video id="video" className="rounded-xl rounded-b-none" src={'/kokona.mp4'} autoPlay muted loop playsInline disablePictureInPicture></video>
      </div>
      <p className="mt-2 mb-2">SOCIALS</p>
      <div className="flex flex-col gap-2 items-center align-center justify-center">
        <a href="https://twitter.com/tixosu" className="btn btn-sm btn-neutral">
          <Image id="white" alt="Twitter" className="h-4 w-4" width={4} height={4} src="/twitter.svg"></Image>
          <div className="flex p-0 m-0 gap-1">
            <p>TWITTER</p>
            {/* <p className="text-[0.5rem] h-max align-text-bottom text-gray-500">TWITTER</p> */}
          </div>
        </a>
        <a href="https://www.instagram.com/emm_ment/" className="btn btn-sm btn-neutral">
          <Image id="white" alt="Instagram" className="h-4 w-4" width={4} height={4} src="/instagram.svg"></Image>
          <p>INSTAGRAM</p>
        </a>
        <a href="https://www.linkedin.com/in/emment/" className="btn btn-sm btn-neutral">
          <Image id="white" alt="LinkedIn" className="h-4 w-4" width={4} height={4} src="/linkedin.svg"></Image>
          <p>LINKEDIN</p>
        </a>
        <a href="https://github.com/Tx-ID" className="btn btn-sm btn-neutral">
          <Image id="white" alt="Github" className="h-4 w-4" width={4} height={4} src="/github.svg"></Image>
          <p>GITHUB</p>
        </a>
      </div>
      <p className="mt-2 mb-2 uppercase">misc</p>
      <div className="flex flex-col gap-2 items-center align-center justify-center mb-4">
        <button onClick={() => { setAlert("Discord username has been copied to clipboard."); setIsOpen(true); navigator.clipboard.writeText("tix1"); }} className="btn btn-sm btn-neutral">
          <Image id="white" alt="Discord" className="h-4 w-4" width={4} height={4} src="/discord.svg"></Image>
          <p>DISCORD</p>
        </button>
        <a href="https://osu.ppy.sh/users/11421465" className="btn btn-sm btn-neutral">
          <div className="fill-white h-4 w-4"><OsuIcon /></div>
          <p>OSU!</p>
        </a>
        <a href="https://www.roblox.com/users/65461579/profile" className="btn btn-sm btn-neutral">
          <Image id="white" alt="Roblox" className="h-4 w-4" width={4} height={4} src="/roblox.svg"></Image>
          <p>ROBLOX</p>
        </a>
      </div>
    </main>
  )
}
