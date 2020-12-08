import * as THREE from 'three';

export default {

    positionToVector2( position ) {
        let column = position.charCodeAt(0) - 65;
        let row = 8 - parseInt( position[1] );

        return new THREE.Vector2( column, row );
    },

    vector2ToPosition( vector ) {
        return String.fromCharCode( 65 + vector.x ) + ( 8 - vector.y );
    }

}