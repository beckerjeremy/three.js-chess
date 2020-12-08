import * as THREE from 'three';

class ChessPiece extends THREE.Mesh {

    constructor( color, fenPosition = null, geometry ) {
        super( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
        this.geometry.translate( 0, geometry.parameters.height / 2, 0 );
        this.castShadow = true;
        this.receiveShadow = true;

        this.color = color;
        this.fenPosition = fenPosition; 
        this.hasMoved = false;
    }

    // Retrun the fields a piece can move to
    getPossibleMoves( board ) {

    }

}

export default ChessPiece;