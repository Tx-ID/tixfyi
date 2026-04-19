'use client'

import { memo } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

function fmt(d) {
  if (d === 'NOW') return 'now'
  return `${MONTHS[d.month - 1]} ${d.year}`
}

const variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 22 },
  },
}

function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="inline-block w-3 h-3 ml-1.5 -translate-y-0.5 text-zinc-500 group-hover:text-zinc-300 transition-colors"
    >
      <path d="M4 4h8v8M12 4 4 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const WorkEntry = memo(function WorkEntry({
  title,
  description,
  image,
  imageWidth = 800,
  imageHeight = 450,
  link,
  start,
  end,
}) {
  const titleInner = (
    <>
      {title}
      {link && <ExternalArrow />}
    </>
  )

  return (
    <motion.article
      variants={variants}
      className="grid grid-cols-1 md:grid-cols-[170px_1fr] gap-3 md:gap-10"
    >
      <div className="text-xs md:text-sm text-zinc-500 font-mono tabular-nums tracking-tight md:pt-1 whitespace-nowrap">
        {fmt(start)} — {fmt(end)}
      </div>
      <div className="min-w-0">
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-balance text-zinc-100">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:text-white transition-colors"
            >
              {titleInner}
            </a>
          ) : (
            titleInner
          )}
        </h3>
        {description && (
          <p className="mt-2 text-sm md:text-base text-zinc-400 leading-relaxed text-pretty max-w-[55ch]">
            {description}
          </p>
        )}
        {image && (
          <div className="mt-5 rounded-xl overflow-hidden ring-1 ring-inset ring-white/10 max-w-lg">
            <Image
              src={image}
              alt={title}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </motion.article>
  )
})

export default WorkEntry
