'use client'

import { memo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import Image from 'next/image'

const MAGNET_SPRING = { stiffness: 260, damping: 22, mass: 0.6 }
const PULL_STRENGTH = 0.3

const enterVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 6 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 22 },
  },
}

const classes =
  "inline-flex items-center gap-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] " +
  "px-4 py-3 md:py-2 text-sm font-medium tracking-tight text-zinc-100 " +
  "ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] " +
  "active:bg-white/[0.12] btn-shine overflow-hidden relative " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 " +
  "transition-colors duration-200"

const PortalButton = memo(function PortalButton({ icon, label, href, onClick }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, MAGNET_SPRING)
  const springY = useSpring(y, MAGNET_SPRING)

  const onPointerMove = reduced
    ? undefined
    : (e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * PULL_STRENGTH)
        y.set((e.clientY - r.top - r.height / 2) * PULL_STRENGTH)
      }

  const onPointerLeave = reduced
    ? undefined
    : () => {
        x.set(0)
        y.set(0)
      }

  const shared = {
    ref,
    variants: enterVariants,
    whileTap: { scale: 0.95 },
    onPointerMove,
    onPointerLeave,
    style: reduced ? undefined : { x: springX, y: springY },
    className: classes,
  }

  const body = (
    <>
      <Image id="white" alt="" aria-hidden="true" className="h-4 w-4" width={16} height={16} src={icon} />
      {label}
    </>
  )

  return href
    ? <motion.a href={href} {...shared}>{body}</motion.a>
    : <motion.button type="button" onClick={onClick} {...shared}>{body}</motion.button>
})

export default PortalButton
