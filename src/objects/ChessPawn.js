import ChessPiece from './ChessPiece';
import ChessUtils from './ChessUtils';

import * as THREE from 'three';

class ChessPawn extends ChessPiece {

    constructor( color, fenPosition = null ) {
        super( color, fenPosition, new THREE.BoxBufferGeometry( .5, .5, .5 ) );
        
        this.hasMovedTwo = false;
    }

    getPossibleMoves( board ) {
        let moves = [];
        let positionVector = ChessUtils.positionToVector2( this.fenPosition );
        let direction = this.color == 'white' ? -1 : 1;

        // Check default moves
        let move = board.getFieldByPositionCoordinates( positionVector.x, positionVector.y + direction )
        if( move != null && move.piece == null ) {
            moves.push( move );
            let doubleMove = board.getFieldByPositionCoordinates( positionVector.x, positionVector.y + 2 * direction );
            if( doubleMove != null && doubleMove.piece == null )
                if( this.color == 'white' && positionVector.y == 6 || this.color == 'black' && positionVector.y == 1) moves.push( doubleMove );
        }
        
        // Check take moves for left and right diagonal field
        let fieldLeft = board.getFieldByPositionCoordinates( positionVector.x - 1, positionVector.y + direction );
        if( fieldLeft != null && fieldLeft.piece != null && fieldLeft.piece.color != this.color )
            moves.push( fieldLeft );

        let fieldRight = board.getFieldByPositionCoordinates( positionVector.x + 1, positionVector.y + direction );
        if( fieldRight != null && fieldRight.piece != null && fieldRight.piece.color != this.color )
            moves.push( fieldRight );

        // Check take move for en passant left and right
        let enPassantLeft = board.getFieldByPositionCoordinates( positionVector.x - 1, positionVector.y);
        if( enPassantLeft != null && enPassantLeft.piece != null && enPassantLeft.piece.color != this.color && enPassantLeft.piece.hasMovedTwo == true )
            moves.push( fieldLeft );

        let enPassantRight = board.getFieldByPositionCoordinates( positionVector.x + 1, positionVector.y);
        if( enPassantRight != null && enPassantRight.piece != null && enPassantRight.piece.color != this.color )
            moves.push( fieldRight );

        return moves;
    }

}

export default ChessPawn;