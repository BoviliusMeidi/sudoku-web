"use client";
import SudokuBoard from "@/components/SudokuBoard";
import Controls from "@/components/Controls";
import Timer from "@/components/Timer";
import NumberPad from "@/components/NumberPad";
import { useSudokuGame } from "@/hooks/useSudokuGame";
import { useEffect, useState } from "react";

export default function HomePage() {
  const {
    gameId,
    game,
    board,
    selected,
    errors,
    isRunning,
    finished,
    finalTime,
    highlightNumber,
    handleChange,
    handleUndo,
    handleNewGame,
    handleSolve,
    handleHint,
    handleSelectCell,
  } = useSudokuGame();

  const [bestTime, setBestTime] = useState<number | null>(null);

  useEffect(() => {
    const storedTime = localStorage.getItem("bestTime");
    if (storedTime) setBestTime(Number(storedTime));
  }, []);

  useEffect(() => {
    if (finished && finalTime > 0) {
      if (bestTime === null || finalTime < bestTime) {
        localStorage.setItem("bestTime", String(finalTime));
        setBestTime(finalTime);
      }
    }
  }, [finished, finalTime, bestTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key >= "1" && e.key <= "9") {
        handleChange(selected.row, selected.col, parseInt(e.key));
      } else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        handleChange(selected.row, selected.col, null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, handleChange]);

  if (!game) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start md:justify-center font-black mt-4 md:mt-0">
      <h1 className="text-3xl font-bold mb-4">Sudoku.Bovi</h1>
      <div className="flex flex-col justify-center items-center md:flex-row gap-2 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <SudokuBoard
            board={board}
            puzzleMask={game.puzzle}
            onChangeCell={handleChange}
            selected={selected}
            setSelected={handleSelectCell}
            errors={errors}
            highlightNumber={highlightNumber}
          />
        </div>
        <div className="w-full md:w-80">
          <div className="bg-white p-4 rounded shadow">
            <Timer isRunning={isRunning} resetKey={gameId} />
            <div className="mt-2">
              <Controls
                onNewGame={handleNewGame}
                onSolve={handleSolve}
                onHint={handleHint}
                onUndo={handleUndo}
                onClear={() =>
                  selected ? handleChange(selected.row, selected.col, "") : null
                }
              />
            </div>
            <NumberPad
              onInput={(num) =>
                selected ? handleChange(selected.row, selected.col, num) : null
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
