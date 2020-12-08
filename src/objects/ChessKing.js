import ChessPiece from './ChessPiece';
import ChessUtils from './ChessUtils';

const THREE = require("three-js")();

class ChessKing extends ChessPiece {

    constructor( color, fenPosition = null ) {
        super( color, fenPosition, new THREE.BoxBufferGeometry( .7, 1.2, .7 ) );

        this.isChecked = false;
    }

    getPossibleMoves( board ) {
        let moves = [];
        let positionVector = ChessUtils.positionToVector2( this.fenPosition );

        // Check normal moves
        for(let i = -1; i < 2; i++ ) {
            for(let j = -1; j < 2; j++) {
                if( i == 0 && j == 0 ) {
                    let tempPosition = board.getFieldByPositionCoordinates( positionVector.x + i, positionVector.y + j );
                    if( tempPosition != null )
                        if( tempPosition.piece == null ) moves.push( tempPosition );
                        else if( tempPosition.piece.color != this.color ) moves.push( tempPosition );
                }
            }
        }

        // Check castling moves
        if( this.hasMoved == false && this.isChecked == false ) {
            let leftRook = board.getFieldByPositionCoordinates( positionVector.x, 0 ).piece;
            let rightRook = board.getFieldByPositionCoordinates( positionVector.x, 7 ).piece;

            // Check left side
            let castleLeft = true;
            if( leftRook != null && leftRook.color == this.color && leftRook.canCastle == true ) {
                for( let i = 0; i < Math.abs( this.positionVector.y - 1 ); i++ ) {
                    let tempPosition = board.getFieldByPositionCoordinates( positionVector.x, positionVector.y - i );
                    if( tempPosition.piece != null ) {
                        castleLeft = false;
                        break;
                    } 
                }

                if( castleLeft ) moves.push( board.getFieldByPositionCoordinates( positionVector.x, positionVector.y - 2 ) );
            }

            // Check right side
            let castleRight = true;
            if( rightRook != null && rightRook.color == this.color && rightRook.canCastle == true ) {
                for( let i = 0; i < Math.abs( this.positionVector.y - 6 ); i++ ) {
                    let tempPosition = board.getFieldByPositionCoordinates( positionVector.x, positionVector.y + i );
                    if( tempPosition.piece != null ) {
                        castleRight = false;
                        break;
                    } 
                }

                if( castleRight ) moves.push( board.getFieldByPositionCoordinates( positionVector.x, positionVector.y + 2 ) );
            }
        }

        return moves;
    }

}

export default ChessKing;