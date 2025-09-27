"use client";
import React from "react";

type Props = {
  board: number[][];
  puzzleMask: number[][];
  onChangeCell: (r: number, c: number, val: string) => void;
  selected: { row: number; col: number } | null;
  setSelected: (r: number, c: number) => void;
  errors: [number, number][];
  highlightNumber: number | null;
};

function renderValue(val: number) {
  return val === 0 ? "" : String(val);
}

export default function SudokuBoard({
  board,
  puzzleMask,
  onChangeCell,
  selected,
  setSelected,
  errors,
  highlightNumber,
}: Props) {
  return (
    <div className="grid grid-cols-9 w-max border-4 font-black border-black">
      {board.map((row, r) =>
        row.map((val, c) => {
          const isPrefilled = puzzleMask[r][c] !== 0;
          const isSelected = selected?.row === r && selected?.col === c;
          const isError = errors.some(([er, ec]) => er === r && ec === c);
          const isHighlighted =
            highlightNumber !== null &&
            highlightNumber !== 0 &&
            val === highlightNumber;

          let cellClass =
            "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center text-black justify-center text-lg border border-gray-400";

          if (r % 3 === 2) cellClass += " border-b-4";
          if (c % 3 === 2) cellClass += " border-r-4";
          if (r === 0) cellClass += " border-t-4";
          if (c === 0) cellClass += " border-l-4";

          if (isSelected) {
            cellClass += " bg-blue-300";
          } else if (isError) {
            cellClass += " bg-red-300";
          } else if (isHighlighted) {
            cellClass += " bg-yellow-200";
          } else if (isPrefilled) {
            cellClass += " bg-gray-200 font-bold";
          } else {
            cellClass += " bg-white";
          }

          return (
            <div
              key={`${r}-${c}`}
              className={cellClass}
              onClick={() => setSelected(r, c)}
            >
              {isPrefilled ? (
                <span suppressHydrationWarning>{renderValue(val)}</span>
              ) : (
                <input
                  type="text"
                  value={renderValue(val)} // ✅ controlled input
                  onChange={(e) => onChangeCell(r, c, e.target.value)}
                  className="w-full h-full text-center focus:outline-none bg-transparent"
                  maxLength={1}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
