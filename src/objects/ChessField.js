const THREE = require("three-js")();

class ChessField extends THREE.Mesh {

    constructor( color, piece = null ) {
        super( new THREE.BoxBufferGeometry( 1, .1, 1 ), new THREE.MeshPhongMaterial( { color: color } ) );

        this.piece = piece;
    }

    setPiece( piece ) {
        this.piece = piece;
    }

    getPiece() {
        return this.piece;
    }

}

export default ChessField;