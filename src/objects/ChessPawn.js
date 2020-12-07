import ChessPiece from './ChessPiece';
import ChessUtils from './ChessUtils';

const THREE = require("three-js")();

class ChessPawn extends ChessPiece {

    constructor( color, fieldPosition = null ) {
        super( color, fieldPosition, new THREE.BoxBufferGeometry( .5, .5, .5 ) );

        this.hasMoved = false;
    }

    possibleMoves( board ) {
        
    }

}

export default ChessPawn;