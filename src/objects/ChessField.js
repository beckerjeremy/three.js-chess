const THREE = require("three-js")();

class ChessField extends THREE.Mesh {

    constructor( color, piece = null, fenPosition = null ) {
        super( new THREE.BoxBufferGeometry( 1, .1, 1 ), new THREE.MeshPhongMaterial( { color: color } ) );

        this.piece = piece;
        this.fenPosition = fenPosition;
    }

    setPiece( piece ) {
        this.piece = piece;
    }

    getPiece() {
        return this.piece;
    }

    setFenPosition( fenPosition ) {
        this.fenPosition = fenPosition;
    }

    getFenPosition() {
        return this.fenPosition;
    }

}

export default ChessField;