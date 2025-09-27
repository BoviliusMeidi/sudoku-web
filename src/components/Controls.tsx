"use client";

import Image from "next/image";

interface ControlsProps {
  onNewGame: () => void;
  onSolve: () => void;
  onHint: () => void;
  onUndo: () => void;
  onClear: () => void;
}

export default function Controls({
  onNewGame,
  onHint,
  onUndo,
  onClear,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={onNewGame}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        New Game
      </button>

      {/* Masa Development - SOlVE  */}
      {/* <button
        onClick={onSolve}
        className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
      >
        Solve
      </button> */}

      <button
        onClick={onHint}
        className="px-3 py-1 rounded transition bg-gray-300 hover:bg-gray-400"
      >
        <Image src="/hint.svg" alt="Hint" width={20} height={20} />
      </button>

      <button
        onClick={onUndo}
        className="px-3 py-1 rounded transition bg-gray-300 hover:bg-gray-400"
      >
        <Image src="/undo.svg" alt="Undo" width={20} height={20} />
      </button>

      <button
        onClick={onClear}
        className="px-3 py-1 rounded transition bg-gray-300 hover:bg-gray-400"
      >
        <Image src="/eraser.svg" alt="Hint" width={20} height={20} />
      </button>
    </div>
  );
}
