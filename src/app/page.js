'use client'

import { OsuIcon } from "@/components/osu.js"
import { useEffect, useState } from "react"

const video_url = "https://cdn.discordapp.com/attachments/694736624071737376/1159494506538864701/kokonaenae.mp4"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertText, setAlert] = useState("");

  return (
    <main className="bg-base-200 flex flex-col max-w-3xl rounded-xl items-center">
      <div id="alert" className={"absolute alert max-w-xl " + (!isOpen ? "open" : "")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{alertText}</span>
        <div>
          <button onClick={()=>{setIsOpen(false)}} className="btn btn-sm btn-primary">OK</button>
        </div>
      </div>

      <div className="rounded-xl bg-black">
        <video id="video" className="rounded-xl rounded-b-none" src={video_url} autoPlay muted loop playsInline disablePictureInPicture></video>
      </div>
      <p className="mt-2 mb-2">SOCIAL</p>
      <div className="flex flex-wrap space-x-4">
        <a href="https://twitter.com/tixosu" className="btn btn-sm btn-neutral">
          <img id="white" className="h-4 w-4" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"></img>
          <p>TWITTER</p>
        </a>
        <a className="btn btn-sm btn-neutral">
          <img href="https://www.instagram.com/emm_ment/" id="white" className="h-4 w-4" src="https://icons.getbootstrap.com/assets/icons/instagram.svg"></img>
          <p>INSTAGRAM</p>
        </a>
        <a href="https://www.linkedin.com/in/emment/" className="btn btn-sm btn-neutral">
          <img id="white" className="h-4 w-4" src="https://icons.getbootstrap.com/assets/icons/linkedin.svg"></img>
          <p>LINKEDIN</p>
        </a>
      </div>
      <p className="mt-2 mb-2 uppercase">miscellaneous</p>
      <div className="flex flex-wrap mb-4 space-x-4">
        <button onClick={()=>{setAlert("Discord username has been copied to clipboard."); setIsOpen(true); navigator.clipboard.writeText("tix1");}} className="btn btn-sm btn-neutral">
          <img id="white" className="h-4 w-4" src="https://icons.getbootstrap.com/assets/icons/discord.svg"></img>
          <p>DISCORD</p>
        </button>
        <a href="https://osu.ppy.sh/users/11421465" className="btn btn-sm btn-neutral">
          <div className="fill-white h-4 w-4"><OsuIcon /></div>
          <p>OSU!</p>
        </a>
        <a href="https://www.roblox.com/users/65461579/profile" className="btn btn-sm btn-neutral">
          <img id="white" className="h-4 w-4" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Roblox_Logo.svg"></img>
          <p>ROBLOX</p>
        </a>
      </div>
    </main>
  )
}
