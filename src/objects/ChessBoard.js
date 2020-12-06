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
                if( ( i + j ) % 2 == 0 ) newField =  new ChessField( 0xffffff, null, String.fromCharCode(65 + i) + ( 8 - j ) );
                else newField = new ChessField( 0x000000, null, String.fromCharCode(65 + i) + ( 8 - j ) );

                newField.position.set( i, 0, j );
                this.add( newField );
            }
    }

    getFieldByPosition( position ) {
        let positionVector = ChessUtils.positionToVector2(position)

        console.log(positionVector.x, positionVector.y)

        return this.children[ positionVector.x * 8 + ( 7 - positionVector.y ) ];
    }

}

export default ChessBoard;