import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChart3,
  Database,
  Gamepad2,
  Trophy,
} from "lucide-react"

type HeroShowcaseProps = {
  totalRecords: number
  totalMatches: number
  playstyleCount: number
  topPlaystyle: string
  topWinRate: number
}

export function HeroShowcase({
  totalRecords,
  totalMatches,
  playstyleCount,
  topPlaystyle,
  topWinRate,
}: HeroShowcaseProps) {
  return (
    <section className="relative overflow-hidden bg-[#020814]">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_85%_35%,rgba(249,115,22,0.15),transparent_30%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#03101c]" />

      {/* NAV */}
      <nav className="relative z-30 border-b border-white/[0.07] bg-[#020814]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-[#02111d] shadow-[0_0_30px_rgba(34,211,238,0.22)]">
              <Gamepad2 className="h-6 w-6" />
            </div>

            <div>
              <p className="font-black tracking-[0.12em] text-white">
                ROTATION LAB
              </p>
              <p className="text-[11px] uppercase tracking-[0.08em] text-white/45">
                2V2 Playstyle Analytics
              </p>
            </div>
          </div>

          <div className="hidden h-full items-center gap-12 text-sm md:flex">
            <a
              href="#overview"
              className="relative flex h-full items-center font-medium text-white"
            >
              Overview
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            </a>

            <a
              href="#playstyles"
              className="text-white/70 transition hover:text-white"
            >
              Playstyles
            </a>

            <a
              href="#garage"
              className="text-white/70 transition hover:text-white"
            >
              Analysis
            </a>

            <a
              href="#data"
              className="text-white/70 transition hover:text-white"
            >
              Data
            </a>
          </div>

          <Button
            variant="outline"
            className="hidden rounded-xl border-white/25 bg-black/20 px-6 text-white hover:bg-white/10 hover:text-white sm:flex"
          >
            GitHub
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-12">
        <div className="grid min-h-[420px] items-center lg:grid-cols-[0.9fr_1.15fr_0.62fr]">
          {/* LEFT */}
          <div className="relative z-20 pb-8">
            <p className="mb-4 text-xs font-bold tracking-[0.3em] text-cyan-300">
              DATA DRIVEN. GAME INSPIRED.
            </p>

            <h1 className="max-w-[570px] text-5xl font-black italic leading-[0.92] tracking-[-0.04em] text-white sm:text-6xl xl:text-[68px]">
              PLAY SMARTER.
              <span className="mt-2 block text-orange-500">
                RANK HIGHER.
              </span>
            </h1>

            <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-white/70">
              Rotation Lab analyzes synthetic Rocket League 2v2 match data to
              uncover how different playstyles perform, where they excel, and
              what behaviors appear most successful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
            <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-cyan-400 px-7 font-bold text-[#02111d] shadow-[0_0_25px_rgba(34,211,238,0.18)] hover:bg-cyan-300"
            >
                <a href="#playstyles">
                Explore Playstyles
                <ArrowRight className="ml-2 h-4 w-4" />
                </a>
            </Button>
                <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-cyan-400/45 bg-[#03101c]/70 px-7 text-white hover:bg-cyan-400/10 hover:text-white"
                >
                <a href="#data">
                    <BarChart3 className="mr-2 h-4 w-4 text-cyan-300" />
                    View the Data
                </a>
                </Button>


            </div>
          </div>

          {/* CENTER CAR */}
          <div className="relative hidden min-h-[420px] items-center justify-center lg:flex">
            <div className="absolute h-[370px] w-[470px] rounded-full bg-cyan-500/10 blur-[90px]" />

            <div className="absolute bottom-[55px] left-1/2 h-[45px] w-[440px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-2xl" />

            <img
              src="/cars/rotational.png"
              alt="Rotational battle car"
              className="relative z-10 w-[610px] max-w-none -translate-x-3 translate-y-1 drop-shadow-[0_28px_35px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* RIGHT CARD */}
          <div className="relative z-20 hidden justify-self-end lg:block">
            <div className="w-[270px] rounded-2xl border border-white/15 bg-black/65 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.16em] text-white/40">
                    TOP PLAYSTYLE
                  </p>

                  <h2 className="mt-2 text-xl font-black text-white">
                    {topPlaystyle}
                  </h2>
                </div>

                <Trophy className="h-6 w-6 text-orange-400" />
              </div>

              <p className="mt-6 text-[48px] font-black leading-none tracking-tight text-cyan-300">
                {topWinRate.toFixed(1)}%
              </p>

              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/40">
                Simulated Win Rate
              </p>

              <div className="mt-5 h-[7px] overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-orange-400"
                  style={{ width: `${topWinRate}%` }}
                />
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-sm leading-6 text-white/50">
                  Current leader across the synthetic 2v2 dataset.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE DATA STRIP */}
        <div className="relative z-20 pb-6">
          <div className="grid min-h-[76px] items-center rounded-2xl border border-cyan-400/20 bg-[#03101c]/90 px-5 shadow-[0_12px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl md:grid-cols-[1fr_1fr_1fr_1fr_1.5fr]">
            <HeroMetric
              icon={<Database className="h-6 w-6" />}
              value={totalRecords.toLocaleString()}
              label="Player Records"
            />

            <HeroMetric
              icon={<Gamepad2 className="h-6 w-6" />}
              value={totalMatches.toLocaleString()}
              label="Unique Matches"
            />

            <HeroMetric
              icon={<BarChart3 className="h-6 w-6" />}
              value={playstyleCount.toString()}
              label="Playstyles"
            />

            <HeroMetric
              icon={<Database className="h-6 w-6" />}
              value="LIVE"
              label="From Supabase"
              live
            />

            <div className="hidden border-l border-white/10 pl-8 text-right md:block">
              <p className="italic text-white/50">
                “Same game. Different data.”
              </p>
              <p className="mt-1 text-[11px] tracking-[0.14em] text-white/35">
                — ROTATION LAB
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroMetric({
  icon,
  value,
  label,
  live = false,
}: {
  icon: React.ReactNode
  value: string
  label: string
  live?: boolean
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div className="text-cyan-300">{icon}</div>

      <div>
        <div className="flex items-center gap-2">
          <p className="text-xl font-black text-white">{value}</p>

          {live && (
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          )}
        </div>

        <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">
          {label}
        </p>
      </div>
    </div>
  )
}