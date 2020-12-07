import ChessField from './ChessField';
import ChessUtils from './ChessUtils';

const THREE = require("three-js")();

class ChessBoard extends THREE.Group {

    constructor() {
        super();
        this.generateBoard();        
    }

    generateBoard() {
        // Generate chess field
        for( let i = 0; i < 8; i++ )
            for( let j = 0; j < 8; j++ ) {
                let newField = null;
                let vector = new THREE.Vector2( i, j );
                if( ( i + j ) % 2 == 0 ) newField =  new ChessField( 0xffffff, null, ChessUtils.vector2ToPosition( vector ) );
                else newField = new ChessField( 0x000000, null, ChessUtils.vector2ToPosition( vector ) );

                newField.position.set( i, 0, j );
                this.add( newField );
            }
    }

    getFieldByPosition( position ) {
        let positionVector = ChessUtils.positionToVector2(position)

        return this.children[ positionVector.x * 8 + ( 7 - positionVector.y ) ];
    }

}

export default ChessBoard;