import * as THREE from 'three';

class ChessGame {

    constructor( board = null ) {
        if( board == null ) this.board = new ChessBoard();
        else this.board = board;
    }

    move( from, to ) {

    }

    validateMove() {

    }

}

export default ChessGame;