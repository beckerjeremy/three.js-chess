const THREE = require("three-js")();

class ChessField extends THREE.Mesh {

    constructor( color, piece = null, fieldPosition = null ) {
        super( new THREE.BoxBufferGeometry( 1, .1, 1 ), new THREE.MeshPhongMaterial( { color: color } ) );

        this.piece = piece;
        this.fieldPosition = fieldPosition;
    }

    setPiece( piece ) {
        this.piece = piece;
    }

    getPiece() {
        return this.piece;
    }

    setFieldPosition( fieldPosition ) {
        this.fieldPosition = fieldPosition;
    }

    getFieldPosition() {
        return this.fieldPosition;
    }

}

export default ChessField;