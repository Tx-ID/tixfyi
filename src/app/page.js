'use client'

import { useEffect, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "motion/react"
import PortalButton from "./PortalButton"
import WorkEntry from "./WorkEntry"

// ─────────────────────────────────────────────────────────────────────────────
//  CONTENT — edit these two to update the page
// ─────────────────────────────────────────────────────────────────────────────

// Short bio, 1–3 sentences. Rendered in the intro section.
const bio = `building small things on the internet when i'm bored. the links above are the best way to reach me.`

// Work / past projects. Each entry schema:
//
//   title        (required)  role or project name
//   description  (optional)  what you built / shipped — keep it short
//   image        (optional)  '/work/thing.jpg'  (put file in /public/work/)
//   imageWidth   (optional)  source image width in px  — default 800
//   imageHeight  (optional)  source image height in px — default 450  (16:9)
//   link         (optional)  'https://...'     (adds an arrow, opens in new tab)
//   start        (required)  { month: 1–12, year: 2025 }
//   end          (required)  { month, year }   OR   'NOW'   for ongoing
//
// Leave any optional field out entirely. Empty array renders the empty state.
const works = [
  {
    title: "Chitose Sana",
    description: "discord-to-roblox account verification bot, similar in purpose to bloxlink. discord is the primary interface for users linking their accounts.",
    link: "https://chitose.inaf-rblx.com/",
    start: { month: 10, year: 2024 },
    end: 'NOW',
  },
  {
    title: "한국 머더",
    description: "main programmer on a korean-audience roblox game.",
    link: "https://www.roblox.com/games/5720801512/unnamed",
    start: { month: 6, year: 2022 },
    end: 'NOW',
  },
  {
    title: "Indo Voice",
    description: "supporting developer on the roblox game.",
    link: "https://www.roblox.com/games/8356562067/Indo-Voice",
    start: { month: 12, year: 2021 },
    end: 'NOW',
  },
]

// ─────────────────────────────────────────────────────────────────────────────

const buttonRowVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.35 },
  },
}

// Shared entrance variants for text content revealed on scroll-in.
const sectionContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
}

const sectionChildVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 130, damping: 22 },
  },
}

const sectionViewport = { once: true, margin: "-100px" }

const TILT_SPRING = { stiffness: 140, damping: 22, mass: 0.6 }
const MAX_TILT = 7

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertText, setAlert] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Normalized 0..1 cursor position across the viewport.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // Map cursor → rotation (vanilla-tilt convention: cursor top → top forward, cursor right → right forward)
  const rawRx = useTransform(my, [0, 1], [-MAX_TILT, MAX_TILT]);
  const rawRy = useTransform(mx, [0, 1], [MAX_TILT, -MAX_TILT]);

  const rotateX = useSpring(rawRx, TILT_SPRING);
  const rotateY = useSpring(rawRy, TILT_SPRING);

  // Scroll hint fades as the user scrolls past the hero.
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 180], [0.55, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePlaying = () => setIsVideoPlaying(true);
    video.addEventListener("playing", handlePlaying);
    if (!video.paused) setIsVideoPlaying(true);
    return () => video.removeEventListener("playing", handlePlaying);
  }, []);

  useEffect(() => {
    const hoverCapable = window.matchMedia('(hover: hover)').matches;
    setCanHover(hoverCapable);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hoverCapable || reduced) return;

    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);

      const card = cardRef.current;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
      }
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="alert"
            role="status"
            initial={{ opacity: 0, x: '-50%', y: -60 }}
            animate={{ opacity: 1, x: '-50%', y: 0 }}
            exit={{ opacity: 0, x: '-50%', y: -60 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="fixed top-3 left-1/2 z-30 flex items-center gap-3 rounded-xl px-4 py-3 text-sm bg-zinc-900/90 backdrop-blur ring-1 ring-inset ring-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] max-w-[calc(100vw-1.5rem)] md:max-w-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-zinc-300 shrink-0 w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="flex-1 text-zinc-200">{alertText}</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1 rounded-md"
            >
              dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero-perspective relative min-h-[100dvh] flex items-center justify-center px-4 py-16">
      <motion.main
        ref={cardRef}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={canHover ? { z: 30 } : undefined}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }}
        className="card-spotlight relative z-10 w-full max-w-3xl rounded-2xl bg-zinc-900/50 backdrop-blur-md ring-1 ring-inset ring-white/10 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.7),0_10px_30px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <div className="rounded-t-2xl bg-black relative overflow-hidden">
          <div className={"skeleton-overlay" + (isVideoPlaying ? " hidden-skeleton" : "")} />
          <video
            ref={videoRef}
            id="video"
            className="w-full rounded-t-2xl bg-black block"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
          >
            <source src="/video-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
            <source src="/video.webm" type="video/webm" />
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>

        <motion.div
          variants={buttonRowVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-2 items-center justify-center p-4"
        >
          <PortalButton
            href="https://github.com/Tx-ID"
            icon="/svg/github.svg"
            label="github"
          />
          <PortalButton
            onClick={() => {
              setAlert("Discord username copied — tix1");
              setIsOpen(true);
              navigator.clipboard.writeText("tix1");
            }}
            icon="/svg/discord.svg"
            label="discord"
          />
        </motion.div>
      </motion.main>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20"
          aria-hidden="true"
        >
          <motion.svg
            viewBox="0 0 16 16"
            className="w-5 h-5 text-zinc-500"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M4 6 8 10 12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
        variants={sectionContainerVariants}
        className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-40"
      >
        <motion.h1
          variants={sectionChildVariants}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-balance text-zinc-100"
        >
          hi, i&apos;m tix
        </motion.h1>
        <motion.p
          variants={sectionChildVariants}
          className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed text-pretty max-w-[55ch]"
        >
          {bio}
        </motion.p>
      </motion.section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          variants={sectionContainerVariants}
          className="flex items-baseline justify-between mb-12 md:mb-20 gap-6"
        >
          <motion.h2
            variants={sectionChildVariants}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-100"
          >
            work
          </motion.h2>
          <motion.span
            variants={sectionChildVariants}
            className="text-xs text-zinc-500 font-mono tracking-wide shrink-0"
          >
            past &amp; present
          </motion.span>
        </motion.div>

        {works.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ type: 'spring', stiffness: 130, damping: 22 }}
            className="text-sm text-zinc-500 italic"
          >
            nothing here yet. first entry soon.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-12 md:space-y-16"
          >
            {works.map((work, i) => (
              <WorkEntry key={i} {...work} />
            ))}
          </motion.div>
        )}
      </section>
    </MotionConfig>
  );
}
