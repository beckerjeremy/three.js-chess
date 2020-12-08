const THREE = require("three-js")();

export default {

    positionToVector2( position ) {
        let column = position.charCodeAt(0) - 65;
        let row = parseInt( position[1] ) - 1;

        return new THREE.Vector2( column, row );
    },

    vector2ToPosition( vector ) {
        return String.fromCharCode( 65 + vector.x ) + ( vector.y + 1 );
    }

}