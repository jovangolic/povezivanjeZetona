import Grid from "./Grid.js";
import Player from "./Player.js";
import GridPosition from "./GridPosition.js";

class Game {
    constructor(grid, connectN, targetScore) {
        this.grid = grid;
        this.connectN = connectN;
        this.targetScore = targetScore;
        this.players = [
            new Player("Player 1", GridPosition.YELLOW),
            new Player("Player 2", GridPosition.RED),
        ];
        this.score = {};
        this.players.forEach(player => {
            this.score[player.getName()] = 0;
        });
    }

    // Ispisivanje table
    printBoard() {
        console.log("Board:");
        let gridData = this.grid.getGrid();
        gridData.forEach(row => {
            console.log(
                row
                    .map(cell =>
                        cell === GridPosition.EMPTY
                            ? "0"
                            : cell === GridPosition.YELLOW
                            ? "Y"
                            : "R"
                    )
                    .join("")
            );
        });
        console.log();
    }

    // Odrigravanje poteza
    playMove(player) {
        this.printBoard();
        console.log(`${player.getName()}'s turn`);
        let colCnt = this.grid.getColumnCount();

        let moveColumn;
        do {
            moveColumn = parseInt(
                prompt(`Enter column between 0 and ${colCnt - 1} to add piece:`),
                10
            );
        } while (isNaN(moveColumn) || moveColumn < 0 || moveColumn >= colCnt);

        let moveRow = this.grid.placePiece(moveColumn, player.getPieceColor());
        return [moveRow, moveColumn];
    }

    // Igra jedan krug
    playRound() {
        while (true) {
            for (let player of this.players) {
                let [row, col] = this.playMove(player);
                let pieceColor = player.getPieceColor();
                if (this.grid.checkWin(this.connectN, row, col, pieceColor)) {
                    this.score[player.getName()] += 1;
                    return player;
                }
            }
        }
    }

    // Glavna petlja igre
    play() {
        let maxScore = 0;
        let winner = null;
        while (maxScore < this.targetScore) {
            winner = this.playRound();
            console.log(`${winner.getName()} won the round`);
            maxScore = Math.max(this.score[winner.getName()], maxScore);
            this.grid.initGrid(); // Resetovanje table
        }
        console.log(`${winner.getName()} won the game!`);
    }
}

export default Game;