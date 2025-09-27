export type Move = { row: number; col: number; value: number };

export class GameLogic {
  private history: number[][][] = [];
  private future: number[][][] = [];

  constructor(private board: number[][]) {}

  setMove(row: number, col: number, value: number) {
    const newBoard = this.board.map(r => [...r]);
    newBoard[row][col] = value;

    this.history.push(this.board.map(r => [...r]));
    this.board = newBoard;
    this.future = [];
    return this.board;
  }

  undo() {
    if (this.history.length > 0) {
      this.future.push(this.board.map(r => [...r]));
      this.board = this.history.pop()!;
    }
    return this.board;
  }

  redo() {
    if (this.future.length > 0) {
      this.history.push(this.board.map(r => [...r]));
      this.board = this.future.pop()!;
    }
    return this.board;
  }

  check(solution: number[][]) {
    let valid = true;
    const errors: { row: number; col: number }[] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (this.board[r][c] !== 0 && this.board[r][c] !== solution[r][c]) {
          errors.push({ row: r, col: c });
          valid = false;
        }
      }
    }
    return { valid, errors };
  }
}
