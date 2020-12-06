const THREE = require("three-js")();

class ChessPiece extends THREE.Mesh {

    constructor( type, color, position = null ) {
        super();

        this.type = type;
        this.color = color;
        this.position = position;
    }

    canMove( from, to ) {
        return true;
    }

}