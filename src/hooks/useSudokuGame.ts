"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { generateSudoku } from "@/lib/sudokuGenerator";
import { getHint } from "@/lib/sudokuSolver";

export type SudokuGame = {
  puzzle: number[][];
  solution: number[][];
};

export function clone(board: number[][]) {
  return board.map((r) => r.slice());
}

export function useSudokuGame() {
  const [gameId, setGameId] = useState(0);
  const [game, setGame] = useState<SudokuGame | null>(null);
  const [board, setBoard] = useState<number[][]>([]);
  const boardRef = useRef<number[][]>([]);
  const historyRef = useRef<number[][][]>([]);
  const futureRef = useRef<number[][][]>([]);
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [errors, setErrors] = useState<[number, number][]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [highlightNumber, setHighlightNumber] = useState<number | null>(null);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    const g = generateSudoku();
    setGame(g);
    setBoard(clone(g.puzzle));
    boardRef.current = clone(g.puzzle);
    historyRef.current = [];
    futureRef.current = [];
    setErrors([]);
    setSelected(null);
    setIsRunning(true);
    setFinished(false);
    setFinalTime(0);
  }, [gameId]);

  const pushBoard = useCallback((newBoard: number[][]) => {
    historyRef.current.push(clone(boardRef.current));
    futureRef.current = [];
    boardRef.current = clone(newBoard);
    setBoard(clone(newBoard));
  }, []);

  function handleChange(row: number, col: number, val: string | number | null) {
    if (!game) return;

    const nb = clone(boardRef.current);

    if (val === "" || val === null) {
      nb[row][col] = 0;
    } else if (typeof val === "number") {
      if (!Number.isInteger(val) || val < 1 || val > 9) return;
      nb[row][col] = val;
    } else {
      const n = Number(val);
      if (!Number.isInteger(n) || n < 1 || n > 9) return;
      nb[row][col] = n;
    }

    pushBoard(nb);

    setErrors((errs) => {
      const newErrs = errs.filter(([er, ec]) => !(er === row && ec === col));
      if (val !== "" && val !== null && nb[row][col] !== game.solution[row][col]) {
        newErrs.push([row, col]);
      }
      return newErrs;
    });
  }

  function handleUndo() {
    if (historyRef.current.length === 0) return;
    const prev = historyRef.current.pop()!;
    futureRef.current.unshift(clone(boardRef.current));
    boardRef.current = clone(prev);
    setBoard(clone(prev));
    updateErrors();
  }

  function updateErrors() {
    if (!game) return;
    const newErrors: [number, number][] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (boardRef.current[r][c] !== 0 && boardRef.current[r][c] !== game.solution[r][c]) {
          newErrors.push([r, c]);
        }
      }
    }
    setErrors(newErrors);
  }

  function handleNewGame() {
    setGameId((id) => id + 1);
  }

  function handleSolve() {
    if (!game) return;
    setBoard(clone(game.solution));
    boardRef.current = clone(game.solution);
    setIsRunning(false);
    setFinished(true);
    setErrors([]);
  }

  function handleHint() {
    if (!game) return;
    const hint = getHint(boardRef.current, game.solution);
    if (!hint) return;
    const nb = clone(boardRef.current);
    nb[hint.row][hint.col] = hint.value;
    pushBoard(nb);
    updateErrors();
  }

  function handleSelectCell(row: number, col: number) {
    setSelected({ row, col });
    const value = boardRef.current[row][col];
    setHighlightNumber(value !== 0 ? value : null);
  }

  useEffect(() => {
    if (!game || finished) return;
    let complete = true;
    for (let r = 0; r < 9 && complete; r++) {
      for (let c = 0; c < 9; c++) {
        if (boardRef.current[r][c] !== game.solution[r][c]) {
          complete = false;
          break;
        }
      }
    }
    if (complete) {
      setIsRunning(false);
      setFinished(true);
    }
  }, [board, finished, game]);

  return {
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
    setSelected,
  };
}