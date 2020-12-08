import ChessPiece from './ChessPiece';
import ChessUtils from './ChessUtils';

const THREE = require("three-js")();

class ChessQueen extends ChessPiece {

    constructor( color, fenPosition = null ) {
        super( color, fenPosition, new THREE.BoxBufferGeometry( .5, 1.1, .5 ) );

    }

    getPossibleMoves( board ) {
        let moves = [];
        let positionVector = ChessUtils.positionToVector2( this.fenPosition );

        // Check rook moves
        let directions = [ -1, 1, 0, 0 ];
        for(let i = 0; i < 4; i ++) {
            let xDirection = directions[i];
            let yDirection = directions[directions.length - 1 - i];
            for( let j = 1; j < 8; j++ ) {
                let tempPosition = board.getFieldByPositionCoordinates( positionVector.x + j * xDirection, positionVector.y + j * yDirection );
                if( tempPosition != null ) {
                    if( tempPosition.piece != null ) {
                        if( tempPosition.piece.color != this.color ) moves.push( tempPosition );
                        break;
                    }
                    else moves.push( tempPosition );
                } 
                else break;
            }
        }

        // Check bishop moves
        let xDirections = [ -1, 1, -1, 1 ];
        let yDirections = [ -1, -1, 1, 1 ];
        for(let i = 0; i < 4; i ++) {
            for( let j = 1; j < 8; j++ ) {
                let tempPosition = board.getFieldByPositionCoordinates( positionVector.x + j * xDirections[i], positionVector.y + j * yDirections[i] );
                if( tempPosition != null ) {
                    if( tempPosition.piece != null ) {
                        if( tempPosition.piece.color != this.color ) moves.push( tempPosition );
                        break;
                    }
                    else moves.push( tempPosition );
                } 
                else break;
            }
        }

        return moves;
    }

}

export default ChessQueen;