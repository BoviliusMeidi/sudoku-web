"use client";

interface NumberPadProps {
  onInput: (num: number) => void;
}

export default function NumberPad({ onInput }: NumberPadProps) {
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid grid-cols-3 gap-2 w-full mt-4">
      {numbers.map((num) => (
        <button
          key={num}
          className="h-12 text-lg font-bold rounded-lg shadow bg-gray-100 hover:bg-gray-200"
          onClick={() => onInput(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
