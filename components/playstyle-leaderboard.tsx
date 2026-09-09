type PlaystyleStat = {
  playstyle: string
  wins: number
  total: number
  winRate: number
  avgGoals: number
  avgSaves: number
  avgShots: number
  avgDemos: number
}

export function PlaystyleLeaderboard({
  stats,
}: {
  stats: PlaystyleStat[]
}) {
  const sorted = [...stats].sort((a, b) => b.winRate - a.winRate)

  const carImages: Record<string, string> = {
    Rotational: "/cars/rotational.png",
    "Defensive Anchor": "/cars/defensive-anchor.png",
    "Mechanical Attacker": "/cars/mechanical-attacker.png",
    "Demo Specialist": "/cars/demo-specialist.png",
    "Ball Chaser": "/cars/ball-chaser.png",
  }

  const descriptions: Record<string, string> = {
    Rotational:
      "Balanced positioning, disciplined spacing, and fewer unnecessary risks.",
    "Defensive Anchor":
      "Protects the back line, absorbs pressure, and contributes heavily through saves.",
    "Mechanical Attacker":
      "Aerial-heavy offense built around mechanics, shooting volume, and boost usage.",
    "Demo Specialist":
      "Creates disruption through physical play, pressure, and opponent demolitions.",
    "Ball Chaser":
      "High-pressure attacking style with heavy shot volume and aggressive positioning.",
  }

  const glow: Record<string, string> = {
    Rotational:
      "border-cyan-400/70 shadow-[0_0_30px_rgba(34,211,238,0.13)]",
    "Defensive Anchor":
      "border-purple-400/20 shadow-[0_0_25px_rgba(168,85,247,0.08)]",
    "Mechanical Attacker":
      "border-red-400/20 shadow-[0_0_25px_rgba(239,68,68,0.08)]",
    "Demo Specialist":
      "border-orange-400/20 shadow-[0_0_25px_rgba(249,115,22,0.08)]",
    "Ball Chaser":
      "border-green-400/20 shadow-[0_0_25px_rgba(34,197,94,0.08)]",
  }

  const imageGlow: Record<string, string> = {
    Rotational: "bg-cyan-400/10",
    "Defensive Anchor": "bg-purple-500/10",
    "Mechanical Attacker": "bg-red-500/10",
    "Demo Specialist": "bg-orange-500/10",
    "Ball Chaser": "bg-green-500/10",
  }

  return (
    <section
      id="playstyles"
      className="relative overflow-hidden bg-[#03101c] py-8"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-cyan-300">
              PLAYSTYLE LEADERBOARD
            </p>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Which playstyle wins the most?
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Ranked by simulated win rate across all player performances in
              the dataset.
            </p>
          </div>

          <a
            href="#garage"
            className="hidden text-sm font-medium text-cyan-300 transition hover:text-cyan-200 md:block"
          >
            View Full Comparison →
          </a>
        </div>

        <div className="grid gap-3 xl:grid-cols-5">
          {sorted.map((style, index) => (
            <article
              key={style.playstyle}
              className={`relative overflow-hidden rounded-2xl border bg-[#07131f] p-4 transition duration-300 hover:-translate-y-1 ${
                glow[style.playstyle] ?? "border-white/10"
              }`}
            >
              {/* Header */}
              <div className="relative z-20 flex items-start justify-between">
                <div>
                  <div className="mb-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-2 text-xs font-bold text-white/45">
                    #{index + 1}
                  </div>

                  <h3 className="max-w-[150px] text-base font-bold leading-tight text-white">
                    {style.playstyle}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black tracking-tight text-cyan-300">
                    {style.winRate.toFixed(1)}%
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.14em] text-white/30">
                    Win Rate
                  </p>
                </div>
              </div>

              {/* Car */}
              <div className="relative mt-1 h-[150px]">
                <div
                  className={`absolute left-1/2 top-1/2 h-[130px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[35px] ${
                    imageGlow[style.playstyle] ?? "bg-cyan-500/10"
                  }`}
                />

                <img
                  src={carImages[style.playstyle]}
                  alt={`${style.playstyle} car`}
                  className="absolute left-1/2 top-1/2 z-10 w-[220px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_16px_16px_rgba(0,0,0,0.7)]"
                />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-4 divide-x divide-white/[0.07] rounded-xl border border-white/[0.07] bg-black/20 py-2">
                <CardMetric
                  value={style.avgGoals.toFixed(2)}
                  label="Goals"
                />

                <CardMetric
                  value={style.avgSaves.toFixed(2)}
                  label="Saves"
                />

                <CardMetric
                  value={style.avgShots.toFixed(2)}
                  label="Shots"
                />

                <CardMetric
                  value={style.avgDemos.toFixed(2)}
                  label="Demos"
                />
              </div>

              {/* Description */}
              <p className="mt-4 min-h-[66px] text-xs leading-5 text-white/50">
                {descriptions[style.playstyle]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardMetric({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="text-center">
      <p className="text-sm font-black text-white">{value}</p>

      <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
        {label}
      </p>
    </div>
  )
}