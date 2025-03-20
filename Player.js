class Player {
    constructor(name = "", piece = null) {
        this.name = name;
        this.piece = piece;
    }

    getName() {
        return this.name;
    }

    getPieceColor() {
        return this.piece;
    }
}

export default Player;