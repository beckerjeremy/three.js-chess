const THREE = require("three-js")();

class ChessPiece extends THREE.Mesh {

    constructor( color, fieldPosition = null, geometry ) {
        super( geometry, new THREE.MeshPhongMaterial( { color: color } ) );

        this.color = color;
        this.fieldPosition = fieldPosition; 
    }

    // Retrun the fields a piece can move to
    possibleMoves( board ) {

    }

}

export default ChessPiece;