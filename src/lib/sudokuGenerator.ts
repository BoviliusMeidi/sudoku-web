export function generateSudoku(difficulty: number = 40) {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  function fillBoard(row = 0, col = 0): boolean {
    if (row === 9) return true;
    if (col === 9) return fillBoard(row + 1, 0);

    const numbers = [...Array(9).keys()].map(n => n + 1).sort(() => Math.random() - 0.5);

    for (const num of numbers) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        if (fillBoard(row, col + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  function isValid(b: number[][], r: number, c: number, val: number): boolean {
    for (let i = 0; i < 9; i++) {
      if (b[r][i] === val || b[i][c] === val) return false;
      const boxRow = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(c / 3) + i % 3;
      if (b[boxRow][boxCol] === val) return false;
    }
    return true;
  }

  fillBoard();

  const solution = board.map(row => [...row]);
  let count = difficulty;
  while (count > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
      count--;
    }
  }
  return { puzzle: board, solution };
}