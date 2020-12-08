import ChessField from './ChessField';
import ChessUtils from './ChessUtils';

import ChessPawn from './ChessPawn';
import ChessKnight from './ChessKnight';
import ChessBishop from './ChessBishop';
import ChessRook from './ChessRook';
import ChessQueen from './ChessQueen';
import ChessKing from './ChessKing';

const THREE = require("three-js")();

class ChessBoard extends THREE.Group {

    constructor() {
        super();
        this.generateBoard();
        this.pieces = [];
    }

    generateBoard() {
        this.children = [];
        // Generate chess field
        for( let i = 0; i < 8; i++ )
            for( let j = 0; j < 8; j++ ) {
                let newField = null;
                let vector = new THREE.Vector2( i, j );
                if( ( i + j ) % 2 == 0 ) newField =  new ChessField( 0xd9bb96, null, ChessUtils.vector2ToPosition( vector ) );
                else newField = new ChessField( 0x8a622f, null, ChessUtils.vector2ToPosition( vector ) );

                newField.position.set( i, 0, j );
                this.add( newField );
            }
    }

    setUp ( position ) {
        let positionGroups = position.split(' ');
        let castles = positionGroups[2].split('');

        this.pieces = [];
        this.generateBoard();
        this.placePieces( positionGroups[0] );
    }

    placePieces( position ) {
        let positionRows = position.split('/');

        for( let i = 0; i < positionRows.length; i++ ) {
            let positions = positionRows[i].split('');
            let emptyFields = 0;
            for( let j = 0; j < positions.length; j++ ) {
                let currentPosition = positions[j];

                if( parseInt( currentPosition ) > 0 ) {
                    emptyFields += parseInt( currentPosition ) - 1;
                } else {
                    this.placePiece( new THREE.Vector2( j + emptyFields, 7 - i ), currentPosition );
                }
            }
            emptyFields = 0;
        }
    }

    placePiece( position, pieceChar ) {
        let charCode = pieceChar.charCodeAt(0);
        let piece;
        switch( charCode ) {
            case 112: piece = new ChessPawn( 'black', ChessUtils.vector2ToPosition( position ) ); break;   // p
            case 80: piece = new ChessPawn( 'white', ChessUtils.vector2ToPosition( position ) ); break;    // P
            case 114: piece = new ChessRook( 'black', ChessUtils.vector2ToPosition( position ) ); break;   // r
            case 82: piece = new ChessRook( 'white', ChessUtils.vector2ToPosition( position ) ); break;    // R
            case 110: piece = new ChessKnight( 'black', ChessUtils.vector2ToPosition( position ) ); break; // n
            case 78: piece = new ChessKnight( 'white', ChessUtils.vector2ToPosition( position ) ); break;  // N
            case 98: piece = new ChessBishop( 'black', ChessUtils.vector2ToPosition( position ) ); break;  // b
            case 66: piece = new ChessBishop( 'white', ChessUtils.vector2ToPosition( position ) ); break;  // B
            case 113: piece = new ChessQueen( 'black', ChessUtils.vector2ToPosition( position ) ); break;  // q
            case 81: piece = new ChessQueen( 'white', ChessUtils.vector2ToPosition( position ) ); break;   // Q
            case 107: piece = new ChessKing( 'black', ChessUtils.vector2ToPosition( position ) ); break;   // k
            case 75: piece = new ChessKing( 'white', ChessUtils.vector2ToPosition( position ) ); break;    // K
        }

        this.pieces.push( piece );
        this.add( piece );
        let field = this.getFieldByPositionCoordinates( position.x, position.y );
        field.piece = piece;
        piece.position.set( field.position.x, field.position.y, field.position.z );
    }

    getFieldByPosition( position ) {
        let positionVector = ChessUtils.positionToVector2(position)

        return this.getFieldByPositionCoordinates( positionVector.x, positionVector.y );
    }

    getFieldByPositionCoordinates( x, y ) {
        if ( x < 0 || x > 7 || y < 0 || y > 7 ) return null;
        return this.children[ x * 8 + ( 7 - y ) ];
    }

}

export default ChessBoard;