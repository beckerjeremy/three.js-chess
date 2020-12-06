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
                if( ( i + j ) % 2 == 0 ) newField =  new ChessField( 0xffffff, null, String.fromCharCode(65 + i) + ( 8 - j ) );
                else newField = new ChessField( 0x000000, null, String.fromCharCode(65 + i) + ( 8 - j ) );

                newField.position.set( i, 0, j );
                this.add( newField );
            }
    }

    getFieldByPosition( position ) {
        let column = position.charCodeAt(0) - 65;
        let row = parseInt( position[1] ) - 1;

        console.log(column, row)

        return this.children[ column * 8 + ( 7 - row ) ]
    }

}

export default ChessBoard;