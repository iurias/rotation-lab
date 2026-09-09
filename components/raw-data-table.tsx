"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type DataRow = Record<string, any>

export function RawDataTable({ data }: { data: DataRow[] }) {
  const [page, setPage] = useState(0)

  const rowsPerPage = 30
  const totalPages = Math.ceil(data.length / rowsPerPage)

  const startIndex = page * rowsPerPage
  const endIndex = Math.min(startIndex + rowsPerPage, data.length)

  const visibleRows = data.slice(startIndex, endIndex)

  if (!data.length) {
    return (
      <section id="data" className="bg-[#03101c] px-6 py-20 text-white">
        <p>No data available.</p>
      </section>
    )
  }

  const columns = Object.keys(data[0])

  return (
    <section id="data" className="relative bg-[#03101c] py-20 text-white">
      <div className="mx-auto max-w-[1400px] px-6">

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-cyan-300">
            RAW DATA EXPLORER
          </p>

          <h2 className="text-3xl font-black sm:text-4xl">
            Explore the dataset.
          </h2>

          <p className="mt-3 max-w-2xl text-white/50">
            Raw player-level match records loaded directly from the Supabase
            player_match_stats table.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#07131f]">

          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left text-sm">

              <thead className="border-b border-white/10 bg-white/[0.04]">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="whitespace-nowrap px-4 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-300"
                    >
                      {column.replaceAll("_", " ")}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleRows.map((row, index) => (
                  <tr
                    key={startIndex + index}
                    className="border-b border-white/[0.06] transition hover:bg-white/[0.035]"
                  >
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="whitespace-nowrap px-4 py-3 text-white/60"
                      >
                        {String(row[column] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-white/55">
                Showing{" "}
                <span className="font-semibold text-white">
                  {startIndex + 1}–{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white">
                  {data.length.toLocaleString()}
                </span>{" "}
                records
              </p>

              <p className="mt-1 text-xs text-white/30">
                Page {page + 1} of {totalPages}
              </p>
            </div>

            <div className="flex gap-2">

              <Button
                variant="outline"
                disabled={page === 0}
                onClick={() => setPage((current) => current - 1)}
                className="border-white/15 bg-white/[0.03] text-white disabled:opacity-30"
              >
                ← Previous
              </Button>

              <Button
                variant="outline"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((current) => current + 1)}
                className="border-cyan-400/30 bg-cyan-400/[0.05] text-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200 disabled:opacity-30"
              >
                Next →
              </Button>

            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-white/30">
          Scroll horizontally to explore all variables →
        </p>

      </div>
    </section>
  )
}