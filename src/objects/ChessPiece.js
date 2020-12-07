const THREE = require("three-js")();

class ChessPiece extends THREE.Mesh {

    constructor( color, fenPosition = null, geometry ) {
        super( geometry, new THREE.MeshPhongMaterial( { color: color } ) );

        this.color = color;
        this.fenPosition = fenPosition; 
        this.hasMoved = false;
    }

    // Retrun the fields a piece can move to
    getPossibleMoves( board ) {

    }

}

export default ChessPiece;