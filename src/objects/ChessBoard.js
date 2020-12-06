import ChessField from './ChessField';

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
                if( ( i + j ) % 2 == 0 ) newField =  new ChessField( 0xffffff );
                else newField = new ChessField( 0x000000 );

                newField.position.set( i, 0, j );
                this.add( newField );
            }
    }

}

export default ChessBoard;