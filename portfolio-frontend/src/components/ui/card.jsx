import * as React from "react"
import { cn } from "@/lib/utils"

/* ──────────────────────────────────────────────────────────
   Card — 3D mouse-tilt + always-on blue glow + float
────────────────────────────────────────────────────────── */
function Card({ className, ...props }) {
  const cardRef = React.useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -14
    const rotY = ((x - cx) / cx) * 14
    card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.06,1.06,1.06)`
    card.style.animationPlayState = "paused"
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = ""
    card.style.animationPlayState = "running"
  }

  return (
    <>
      <div
        ref={cardRef}
        data-slot="card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("skill-card-3d", className)}
        {...props}
      />
      <style>{`
        @keyframes skillFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .skill-card-3d {
          position: relative;
          border-radius: 18px;
          cursor: pointer;
          transform-style: preserve-3d;
          will-change: transform;
          animation: skillFloat 3.6s ease-in-out infinite;
          transition: box-shadow 0.25s ease;
          box-shadow:
            0 0 0 1.5px rgba(59,130,246,0.42),
            0 0 16px 4px rgba(59,130,246,0.26),
            0 6px 22px rgba(0,0,0,0.38);
        }
        .skill-card-3d:hover {
          box-shadow:
            0 0 0 2px rgba(99,179,255,0.75),
            0 0 34px 10px rgba(59,130,246,0.55),
            0 14px 40px rgba(0,0,0,0.48);
        }
        /* Stagger float so cards bob independently */
        .skill-card-3d:nth-child(2)  { animation-delay: -0.5s; }
        .skill-card-3d:nth-child(3)  { animation-delay: -1.0s; }
        .skill-card-3d:nth-child(4)  { animation-delay: -1.5s; }
        .skill-card-3d:nth-child(5)  { animation-delay: -2.0s; }
        .skill-card-3d:nth-child(6)  { animation-delay: -2.5s; }
        .skill-card-3d:nth-child(7)  { animation-delay: -3.0s; }
        .skill-card-3d:nth-child(8)  { animation-delay: -0.3s; }
        .skill-card-3d:nth-child(9)  { animation-delay: -0.8s; }
        .skill-card-3d:nth-child(10) { animation-delay: -1.3s; }
        /* Blue ring border */
        .skill-card-3d::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: 20px;
          border: 1.5px solid rgba(59,130,246,0.35);
          pointer-events: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          z-index: 2;
        }
        .skill-card-3d:hover::before {
          border-color: rgba(99,179,255,0.65);
          box-shadow: 0 0 18px 5px rgba(59,130,246,0.3);
        }
        /* Bottom accent bar */
        .skill-card-3d::after {
          content: '';
          position: absolute;
          bottom: 0; left: 15%; right: 15%;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 3;
        }
        .skill-card-3d:hover::after { opacity: 1; }
        /* Dark glass variant used by Skills page */
        .skill-card-3d.skill-glass {
          background: linear-gradient(145deg,
            rgba(30,41,59,0.88) 0%,
            rgba(15,23,42,0.95) 100%
          ) !important;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(59,130,246,0.28) !important;
        }
        .skill-card-3d.skill-glass:hover {
          border-color: rgba(99,179,255,0.55) !important;
        }
      `}</style>
    </>
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return (
    <div data-slot="card-content" className={cn("px-6", className)} {...props} />
  )
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
