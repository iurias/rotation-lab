import { RawDataTable } from "@/components/raw-data-table"
import { PlaystyleLeaderboard } from "@/components/playstyle-leaderboard"
import { HeroShowcase } from "@/components/hero-showcase"
import { PlaystyleGarage } from "@/components/playstyle-garage"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  ArrowDown,
  BarChart3,
  Gamepad2,
  Target,
  Trophy,
  Users,
} from "lucide-react"

export default async function Page() {
    const { data: matches, error } = await supabase
  .from("player_match_stats")
  .select("*")

if (error) {
  console.error("Supabase error:", error)
}
const totalRecords = matches?.length ?? 0

const totalMatches = new Set(
  matches?.map((row) => row.match_id)
).size

const playstyleStats = Object.values(
  (matches ?? []).reduce(
    (acc, row) => {
      if (!acc[row.playstyle]) {
        acc[row.playstyle] = {
          playstyle: row.playstyle,
          wins: 0,
          total: 0,
          goals: 0,
          assists: 0,
          saves: 0,
          shots: 0,
          shootingPct: 0,
          demos: 0,
          score: 0,
          boostUsed: 0,
          boostCollected: 0,
          zeroBoostTime: 0,
          offensiveHalfPct: 0,
          defensiveHalfPct: 0,
          aerialTime: 0,
          teammateDistance: 0,
        }
      }

      const style = acc[row.playstyle]

      style.total += 1

      if (row.match_result === "Win") {
        style.wins += 1
      }

      style.goals += Number(row.goals) || 0
      style.assists += Number(row.assists) || 0
      style.saves += Number(row.saves) || 0
      style.shots += Number(row.shots) || 0
      style.shootingPct += Number(row.shooting_pct) || 0
      style.demos += Number(row.demos) || 0
      style.score += Number(row.score) || 0
      style.boostUsed += Number(row.boost_used) || 0
      style.boostCollected += Number(row.boost_collected) || 0
      style.zeroBoostTime += Number(row.time_zero_boost_sec) || 0
      style.offensiveHalfPct += Number(row.offensive_half_pct) || 0
      style.defensiveHalfPct += Number(row.defensive_half_pct) || 0
      style.aerialTime += Number(row.aerial_time_sec) || 0
      style.teammateDistance += Number(row.avg_teammate_distance_m) || 0

      return acc
    },
    {} as Record<string, any>
  )
).map((style: any) => ({
  ...style,

  winRate: (style.wins / style.total) * 100,

  avgGoals: style.goals / style.total,
  avgAssists: style.assists / style.total,
  avgSaves: style.saves / style.total,
  avgShots: style.shots / style.total,
  avgShootingPct: style.shootingPct / style.total,
  avgDemos: style.demos / style.total,
  avgScore: style.score / style.total,

  avgBoostUsed: style.boostUsed / style.total,
  avgBoostCollected: style.boostCollected / style.total,
  avgZeroBoostTime: style.zeroBoostTime / style.total,

  avgOffensiveHalfPct: style.offensiveHalfPct / style.total,
  avgDefensiveHalfPct: style.defensiveHalfPct / style.total,
  avgAerialTime: style.aerialTime / style.total,
  avgTeammateDistance: style.teammateDistance / style.total,
}))

const topPlaystyle = playstyleStats.sort(
  (a, b) => b.winRate - a.winRate
)[0]
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
     <HeroShowcase
  totalRecords={totalRecords}
  totalMatches={totalMatches}
  playstyleCount={playstyleStats.length}
  topPlaystyle={topPlaystyle?.playstyle ?? "No data"}
  topWinRate={topPlaystyle?.winRate ?? 0}
/>
<PlaystyleLeaderboard stats={playstyleStats} />
    
      {/* Overview */}
      <section id="overview" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-cyan-300">
              DATASET OVERVIEW
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              The experiment at a glance
            </h2>
          </div>

          <BarChart3 className="hidden h-7 w-7 text-white/30 sm:block" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
  icon={<Users className="h-5 w-5" />}
  value={totalRecords.toLocaleString()}
  label="Player performances"
  detail="Live from Supabase"
/>

<StatCard
  icon={<Gamepad2 className="h-5 w-5" />}
  value={totalMatches.toLocaleString()}
  label="2v2 matches"
  detail="Unique simulated matches"
/>

<StatCard
  icon={<Trophy className="h-5 w-5" />}
  value={`${topPlaystyle?.winRate.toFixed(1) ?? "0.0"}%`}
  label="Top win rate"
  detail={topPlaystyle?.playstyle ?? "No data"}
/>

<StatCard
  icon={<Target className="h-5 w-5" />}
  value={playstyleStats.length.toString()}
  label="Playstyles"
  detail="Distinct player behaviors"
/>
        </div>
      </section>

      {/* Teaser */}
      <section
        id="playstyles"
        className="border-y border-white/10 bg-white/[0.02]"
      >
        <section className="mx-auto max-w-7xl px-6 py-24">
  <div className="mb-10">
    <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-cyan-300">
      PLAYSTYLE LEADERBOARD
    </p>

    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
      Which playstyle wins the most?
    </h2>

    <p className="mt-3 max-w-2xl text-white/45">
      Ranked by simulated win rate across all player performances in the dataset.
    </p>
  </div>

  <div className="space-y-4">
    {playstyleStats
      .sort((a, b) => b.winRate - a.winRate)
      .map((style, index) => (
        <div
          key={style.playstyle}
          className="group grid gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.05] md:grid-cols-[60px_1fr_180px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-lg font-bold text-white/60">
            #{index + 1}
          </div>

          <div>
            <p className="text-lg font-semibold">
              {style.playstyle}
            </p>

            <p className="mt-1 text-sm text-white/35">
              {style.wins} wins across {style.total} player performances
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-3xl font-black tracking-tight text-cyan-300">
              {style.winRate.toFixed(1)}%
            </p>

            <p className="text-xs uppercase tracking-[0.15em] text-white/30">
              Win Rate
            </p>
          </div>
        </div>
      ))}
  </div>
</section>
  <section
  id="playstyles"
  className="relative overflow-hidden border-y border-white/10 bg-white/[0.02]"
>
  <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-[100px]" />
  <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-orange-500/5 blur-[100px]" />

  <div className="relative mx-auto max-w-7xl px-6 py-24">
    <div className="mb-12">
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-orange-300">
        FIVE WAYS TO PLAY
      </p>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Every playstyle leaves a different fingerprint.
        </h2>

        <p className="max-w-xl text-white/50 lg:justify-self-end">
          Each archetype approaches the field differently. Rotation Lab uses
          live Supabase data to compare how those behaviors show up in scoring,
          defense, mechanics, boost usage, positioning, and wins.
        </p>
      </div>
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      {[...playstyleStats]
        .sort((a, b) => b.winRate - a.winRate)
        .map((style, index) => {
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

          const accent =
            index === 0
              ? "border-cyan-400/40 bg-cyan-400/[0.055]"
              : index === playstyleStats.length - 1
                ? "border-orange-400/25 bg-orange-400/[0.035]"
                : "border-white/10 bg-white/[0.035]"

          return (
            <div
              key={style.playstyle}
              className={`group relative overflow-hidden rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${accent}`}
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/35">
                    PLAYSTYLE #{index + 1}
                  </p>

                  <h3 className="text-2xl font-bold">
                    {style.playstyle}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-4xl font-black tracking-tight text-cyan-300">
                    {style.winRate.toFixed(1)}%
                  </p>
                  <p className="text-xs tracking-[0.15em] text-white/30">
                    WIN RATE
                  </p>
                </div>
              </div>

              <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-orange-400"
                  style={{ width: `${style.winRate}%` }}
                />
              </div>

              <p className="mb-8 min-h-[48px] text-sm leading-6 text-white/45">
                {descriptions[style.playstyle]}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric
                  label="Goals"
                  value={style.avgGoals.toFixed(2)}
                />

                <Metric
                  label="Saves"
                  value={style.avgSaves.toFixed(2)}
                />

                <Metric
                  label="Shots"
                  value={style.avgShots.toFixed(2)}
                />

                <Metric
                  label="Demos"
                  value={style.avgDemos.toFixed(2)}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric
                  label="Aerial"
                  value={`${style.avgAerialTime.toFixed(0)}s`}
                />

                <Metric
                  label="Zero Boost"
                  value={`${style.avgZeroBoostTime.toFixed(0)}s`}
                />

                <Metric
                  label="Offense"
                  value={`${style.avgOffensiveHalfPct.toFixed(0)}%`}
                />

                <Metric
                  label="Spacing"
                  value={`${style.avgTeammateDistance.toFixed(1)}m`}
                />
              </div>
            </div>
          )
        })}
    </div>
  </div>
</section>
</section>
<PlaystyleGarage stats={playstyleStats} />
     <RawDataTable data={matches ?? []} />
    </main>
  )
}

function StatCard({
  icon,
  value,
  label,
  detail,
}: {
  icon: React.ReactNode
  value: string
  label: string
  detail: string
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.055]">
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
        {icon}
      </div>

      <p className="text-4xl font-black tracking-tight">{value}</p>
      <p className="mt-2 font-medium">{label}</p>
      <p className="mt-1 text-sm text-white/35">{detail}</p>
    </div>
  )
}
function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-lg font-bold">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/30">
        {label}
      </p>
    </div>
  )
}