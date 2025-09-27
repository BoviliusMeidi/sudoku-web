export type Cell = number | null;

export function solveSudoku(boardInput: number[][]): number[][] | null {
  const board = boardInput.map(r => r.slice());

  function isValid(r: number, c: number, val: number) {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === val || board[i][c] === val) return false;
      const boxRow = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(c / 3) + (i % 3);
      if (board[boxRow][boxCol] === val) return false;
    }
    return true;
  }

  function backtrack(r = 0, c = 0): boolean {
    if (r === 9) return true;
    if (c === 9) return backtrack(r + 1, 0);
    if (board[r][c] !== 0) return backtrack(r, c + 1);

    for (let n = 1; n <= 9; n++) {
      if (isValid(r, c, n)) {
        board[r][c] = n;
        if (backtrack(r, c + 1)) return true;
        board[r][c] = 0;
      }
    }
    return false;
  }

  return backtrack() ? board : null;
}

export function getHint(board: number[][], solution: number[][]): { row: number; col: number; value: number } | null {
  const empty: { row: number; col: number }[] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) empty.push({ row: r, col: c });
    }
  }
  if (empty.length === 0) return null;
  const chosen = empty[Math.floor(Math.random() * empty.length)];
  return { row: chosen.row, col: chosen.col, value: solution[chosen.row][chosen.col] };
}
