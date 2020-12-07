import ChessPiece from './ChessPiece';
import ChessUtils from './ChessUtils';

const THREE = require("three-js")();

class ChessPawn extends ChessPiece {

    constructor( color, fieldPosition = null ) {
        super( color, fieldPosition, new THREE.BoxBufferGeometry( .5, .5, .5 ) );
        
        this.hasMovedTwo = false;
    }

    getPossibleMoves( board ) {
        let moves = [];
        let positionVector = ChessUtils.positionToVector2( this.fieldPosition );
        let direction = this.color == 'white' ? 1 : -1;

        // Check default moves
        let move = board.getFiledByPositionCoordinates( positionVector.x, positionVector.y + direction )
        if( move != null && move.piece == null ) {
            moves.push( move );
            let doubleMove = board.getFiledByPositionCoordinates( positionVector.x, positionVector.y + 2 * direction );
            if( doubleMove != null && doubleMove.piece == null )
                moves.push( doubleMove );
        }
        
        // Check take moves for left and right diagonal field
        let fieldLeft = board.getFiledByPositionCoordinates( positionVector.x - 1, positionVector.y + direction );
        if( fieldLeft != null && fieldLeft.piece != null && fieldLeft.piece.color != this.color )
            moves.push( fieldLeft );

        let fieldRight = board.getFiledByPositionCoordinates( positionVector.x + 1, positionVector.y + direction );
        if( fieldRight != null && fieldRight.piece != null && fieldRight.piece.color != this.color )
            moves.push( fieldRight );

        // Check take move for en passant left and right
        let enPassantLeft = board.getFiledByPositionCoordinates( positionVector.x - 1, positionVector.y);
        if( enPassantLeft != null && enPassantLeft.piece != null && enPassantLeft.piece.color != this.color && enPassantLeft.piece.hasMovedTwo == true )
            moves.push( fieldLeft );

        let enPassantRight = board.getFiledByPositionCoordinates( positionVector.x + 1, positionVector.y);
        if( enPassantRight != null && enPassantRight.piece != null && enPassantRight.piece.color != this.color )
            moves.push( fieldRight );

        return moves;
    }

}

export default ChessPawn;