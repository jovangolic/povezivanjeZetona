import GridPosition from "./GridPosition";

class Grid {
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.initGrid();
    }

    // Inicijalizacija tabele
    initGrid() {
        this.grid = Array.from({ length: this.rows }, () =>
            Array(this.cols).fill(GridPosition.EMPTY)
        );
    }

    getGrid() {
        return this.grid;
    }

    getColumnCount() {
        return this.cols;
    }

    // Postavljanje figura
    placePiece(column, piece) {
        if (column < 0 || column >= this.cols) {
            throw new Error("Invalid column");
        }
        if (piece === GridPosition.EMPTY) {
            throw new Error("Invalid piece");
        }
        // Postavljanje figure u najniži prazan red
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.grid[row][column] === GridPosition.EMPTY) {
                this.grid[row][column] = piece;
                return row;
            }
        }
        return -1; // Kolona je puna
    }

    // Provera pobede
    checkWin(connectN, row, col, piece) {
        return (
            this.checkDirection(connectN, row, col, piece, 0, 1) || // Horizontalno
            this.checkDirection(connectN, row, col, piece, 1, 0) || // Vertikalno
            this.checkDirection(connectN, row, col, piece, 1, 1) || // Dijagonalno \
            this.checkDirection(connectN, row, col, piece, 1, -1)   // Anti-dijagonalno /
        );
    }

    // Provera pobede u određenom pravcu
    checkDirection(connectN, row, col, piece, rowDir, colDir) {
        let count = 0;
        for (let i = -connectN + 1; i < connectN; i++) {
            let r = row + i * rowDir;
            let c = col + i * colDir;
            if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.grid[r][c] === piece) {
                count++;
                if (count === connectN) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }
}

export default Grid;