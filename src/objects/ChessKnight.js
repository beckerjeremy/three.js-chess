import ChessPiece from './ChessPiece';
import ChessUtils from './ChessUtils';

import * as THREE from 'three';

class ChessKnight extends ChessPiece {

    constructor( color, fenPosition = null ) {
        super( color, fenPosition, new THREE.BoxBufferGeometry( .5, .8, .5 ) );

    }

    getPossibleMoves( board ) {
        let moves = [];
        let positionVector = ChessUtils.positionToVector2( this.fenPosition );

        let digits = [ -2, -1, 1, 2 ];

        for( let i = 0; i < 4; i++ )
            for( let j = 0; j < 4; j++ ) {
                let xChange = digits[i];
                let yChange = digits[j];
                if( Math.abs( xChange ) != Math.abs( yChange ) ) {
                    let tempPosition = board.getFieldByPositionCoordinates( positionVector.x + xChange, positionVector.y + yChange );
                    if( tempPosition != null ) {
                        if( tempPosition.piece == null || tempPosition.piece.color != this.color ) moves.push( tempPosition );
                    }
                }
            }
            
        return moves;
        
    }

}

export default ChessKnight;