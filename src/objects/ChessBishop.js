import ChessPiece from './ChessPiece';
import ChessUtils from './ChessUtils';

import * as THREE from 'three';

class ChessBishop extends ChessPiece {

    constructor( color, fenPosition = null ) {
        super( color, fenPosition, new THREE.BoxBufferGeometry( .3, .8, .3 ) );

    }

    getPossibleMoves( board ) {
        let moves = [];
        let positionVector = ChessUtils.positionToVector2( this.fenPosition );

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

export default ChessBishop;