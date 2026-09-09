"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Gauge,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react"

type PlaystyleStat = {
  playstyle: string
  wins: number
  total: number
  winRate: number
  avgGoals: number
  avgAssists: number
  avgSaves: number
  avgShots: number
  avgShootingPct: number
  avgDemos: number
  avgScore: number
  avgBoostUsed: number
  avgBoostCollected: number
  avgZeroBoostTime: number
  avgOffensiveHalfPct: number
  avgDefensiveHalfPct: number
  avgAerialTime: number
  avgTeammateDistance: number
}

export function PlaystyleGarage({
  stats,
}: {
  stats: PlaystyleStat[]
}) {
  const sortedStats = [...stats].sort((a, b) => b.winRate - a.winRate)
  const [selectedName, setSelectedName] = useState(
    sortedStats[0]?.playstyle ?? ""
  )

  const selected =
    sortedStats.find((style) => style.playstyle === selectedName) ??
    sortedStats[0]

  if (!selected) return null

  const descriptions: Record<string, string> = {
    Rotational:
      "Balanced, disciplined, and spaced. Rotation keeps pressure without sacrificing defensive structure.",
    "Defensive Anchor":
      "Patient and protective. This style absorbs pressure and creates value through saves and positioning.",
    "Mechanical Attacker":
      "Fast, aerial, and boost-heavy. Mechanical attackers try to create opportunities through individual skill.",
    "Demo Specialist":
      "Physical and disruptive. Demo specialists create space by removing opponents from the play.",
    "Ball Chaser":
      "Relentless pressure and heavy shot volume, but aggressive positioning can leave the team exposed.",
  }

  const carTilt: Record<string, string> = {
    Rotational: "rotate-0",
    "Defensive Anchor": "-rotate-1",
    "Mechanical Attacker": "-rotate-2",
    "Demo Specialist": "rotate-2",
    "Ball Chaser": "rotate-3",
  }

  return (
    <section
  id="garage"
  className="relative overflow-hidden border-y border-white/10 bg-[#070a11]"
>
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.07] blur-[140px]" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-cyan-300">
            INTERACTIVE PLAYSTYLE GARAGE
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-6xl">
            Pick your build.
            <span className="block bg-gradient-to-r from-cyan-300 to-orange-400 bg-clip-text text-transparent">
              Watch the data change.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/45">
            Each setup represents a different simulated Rocket League 2v2
            playstyle. Select one to see how its performance profile changes.
          </p>
        </div>

        {/* Playstyle selector */}
        <div className="mb-14 flex flex-wrap justify-center gap-2">
          {sortedStats.map((style) => (
            <Button
              key={style.playstyle}
              variant={
                selected.playstyle === style.playstyle
                  ? "default"
                  : "outline"
              }
              onClick={() => setSelectedName(style.playstyle)}
              className={
                selected.playstyle === style.playstyle
                  ? "rounded-full bg-white text-black hover:bg-white/90"
                  : "rounded-full border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/10 hover:text-white"
              }
            >
              {style.playstyle}
            </Button>
          ))}
        </div>

        <div className="grid items-center gap-10 xl:grid-cols-[280px_1fr_280px]">
          {/* LEFT STATS */}
          <div className="space-y-4">
            <Callout
              icon={<Target className="h-4 w-4" />}
              label="Goals / Match"
              value={selected.avgGoals.toFixed(2)}
              detail="Scoring output"
            />

            <Callout
              icon={<Shield className="h-4 w-4" />}
              label="Saves / Match"
              value={selected.avgSaves.toFixed(2)}
              detail="Defensive impact"
            />

            <Callout
              icon={<Activity className="h-4 w-4" />}
              label="Team Spacing"
              value={`${selected.avgTeammateDistance.toFixed(1)}m`}
              detail="Avg teammate distance"
            />
          </div>

          {/* CAR CENTERPIECE */}
          <div className="relative min-h-[500px]">
            <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.025]" />
            <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.06]" />

            {/* Winner badge */}
            <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-xl">
                <Trophy className="h-4 w-4 text-orange-300" />
                <span className="text-xs tracking-[0.18em] text-white/50">
                  SIMULATED WIN RATE
                </span>
              </div>

              <p className="mt-3 text-6xl font-black tracking-tight text-cyan-300">
                {selected.winRate.toFixed(1)}%
              </p>
            </div>

            {/* Car */}
            <div
              className={`absolute left-1/2 top-[56%] w-full max-w-[650px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${carTilt[selected.playstyle] ?? ""}`}
            >
              <BattleCar />

              {/* Boost flame */}
              <div className="absolute left-[3%] top-[48%] h-12 w-28 -translate-y-1/2 rounded-full bg-gradient-to-l from-orange-400/70 via-orange-500/30 to-transparent blur-xl" />

              <div className="absolute left-[8%] top-[48%] h-3 w-24 -translate-y-1/2 bg-gradient-to-l from-orange-300 to-transparent" />
            </div>

            {/* Ground */}
            <div className="absolute bottom-12 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
              <p className="text-2xl font-black">
                {selected.playstyle}
              </p>
              <p className="mt-1 text-xs tracking-[0.18em] text-white/30">
                CURRENT BUILD
              </p>
            </div>
          </div>

          {/* RIGHT STATS */}
          <div className="space-y-4">
            <Callout
              icon={<Rocket className="h-4 w-4" />}
              label="Aerial Time"
              value={`${selected.avgAerialTime.toFixed(0)}s`}
              detail="Time spent airborne"
            />

            <Callout
              icon={<Zap className="h-4 w-4" />}
              label="Zero Boost"
              value={`${selected.avgZeroBoostTime.toFixed(0)}s`}
              detail="Time without boost"
            />

            <Callout
              icon={<Gauge className="h-4 w-4" />}
              label="Offensive Half"
              value={`${selected.avgOffensiveHalfPct.toFixed(0)}%`}
              detail="Field positioning"
            />
          </div>
        </div>

        {/* Bottom analysis strip */}
        <div className="mt-14 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <Sparkles className="h-4 w-4" />
              <p className="text-xs font-semibold tracking-[0.18em]">
                PLAYSTYLE PROFILE
              </p>
            </div>

            <p className="max-w-lg text-sm leading-6 text-white/45">
              {descriptions[selected.playstyle]}
            </p>
          </div>

          <MiniStat
            label="Shots"
            value={selected.avgShots.toFixed(2)}
          />

          <MiniStat
            label="Demos"
            value={selected.avgDemos.toFixed(2)}
          />

          <MiniStat
            label="Shooting"
            value={`${selected.avgShootingPct.toFixed(1)}%`}
          />
        </div>
      </div>
    </section>
  )
}

function Callout({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.055]">
      <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300">
        {icon}
      </div>

      <p className="text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-1 font-medium">{label}</p>
      <p className="mt-1 text-xs text-white/30">{detail}</p>
    </div>
  )
}

function MiniStat({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/30">
        {label}
      </p>
    </div>
  )
}

function BattleCar() {
  return (
    <svg
      viewBox="0 0 760 300"
      className="w-full drop-shadow-[0_0_35px_rgba(34,211,238,0.18)]"
      aria-label="Futuristic battle car visualization"
    >
      <defs>
        <linearGradient id="body" x1="0" x2="1">
          <stop offset="0%" stopColor="#082f49" />
          <stop offset="45%" stopColor="#0e7490" />
          <stop offset="75%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>

        <linearGradient id="window" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
        </linearGradient>

        <radialGradient id="wheel">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="25%" stopColor="#164e63" />
          <stop offset="55%" stopColor="#111827" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
      </defs>

      {/* shadow */}
      <ellipse
        cx="390"
        cy="254"
        rx="300"
        ry="23"
        fill="#22d3ee"
        opacity="0.08"
      />

      {/* spoiler */}
      <path
        d="M115 100 L205 100 L220 122 L125 122 Z"
        fill="#fb923c"
        opacity="0.85"
      />

      <rect
        x="135"
        y="112"
        width="14"
        height="44"
        rx="5"
        fill="#64748b"
      />

      {/* main body */}
      <path
        d="
          M105 205
          C130 163 175 145 240 137
          L310 75
          C335 53 390 44 441 67
          L515 133
          C585 142 631 164 670 207
          L647 224
          L118 224
          Z
        "
        fill="url(#body)"
        stroke="#67e8f9"
        strokeWidth="3"
      />

      {/* windshield */}
      <path
        d="M317 82 C345 59 389 57 428 76 L485 130 L270 130 Z"
        fill="url(#window)"
        stroke="#a5f3fc"
        strokeWidth="2"
      />

      {/* front bumper */}
      <path
        d="M620 183 L696 197 L684 222 L632 219 Z"
        fill="#fb923c"
      />

      {/* headlights */}
      <path
        d="M584 159 L635 171 L620 184 L574 174 Z"
        fill="#fef3c7"
      />

      {/* door panel */}
      <path
        d="M286 145 L488 145 L531 207 L250 207 Z"
        fill="#020617"
        opacity="0.24"
        stroke="#cffafe"
        strokeOpacity="0.35"
      />

      {/* accent stripe */}
      <path
        d="M163 185 C280 160 480 160 622 190"
        fill="none"
        stroke="#f97316"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* wheels */}
      <circle
        cx="205"
        cy="220"
        r="66"
        fill="url(#wheel)"
        stroke="#22d3ee"
        strokeWidth="5"
      />

      <circle
        cx="205"
        cy="220"
        r="26"
        fill="#020617"
        stroke="#fb923c"
        strokeWidth="5"
      />

      <circle
        cx="565"
        cy="220"
        r="66"
        fill="url(#wheel)"
        stroke="#22d3ee"
        strokeWidth="5"
      />

      <circle
        cx="565"
        cy="220"
        r="26"
        fill="#020617"
        stroke="#fb923c"
        strokeWidth="5"
      />
    </svg>
  )
}