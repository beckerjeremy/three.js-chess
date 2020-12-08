const THREE = require("three-js")();

class PieceMoveControls {

    constructor( camera, board ) {
        this.camera = camera;
        this.board = board;
        this.mouse = new THREE.Vector2();
        this.selectedFields = [];
        this.replacedMaterials = [];

        this.raycaster = new THREE.Raycaster();

        window.addEventListener( 'mousedown', ( e ) => { this.onMouseDown( e ); }, false );
        window.addEventListener( 'mouseup', ( e ) => { this.onMouseMove( e ); }, false );
        window.addEventListener( 'mousemove', ( e ) => { this.onMouseUp( e ); }, false );
    }

    onMouseDown( event ) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.mouse, this.camera );
        let intersects = this.raycaster.intersectObjects( this.board.getPieces() );

        if(intersects.length > 0) {
            console.log( intersects[0].object.fenPosition );
            let fields = intersects[0].object.getPossibleMoves( this.board );

            for( let i = 0; i < fields.length; i++ ) {
                this.replacedMaterials.push( fields[i].material );
                this.selectedFields.push( fields[i] );
                fields[i].material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );

            }
        }
    }

    onMouseMove( event ) {
        
    }

    onMouseUp( event ) {
        for( let i = 0; i < this.selectedFields.length; i++ ) {
            let field = this.selectedFields[i];
            field.material = this.replacedMaterials[i];
        }
        this.replacedMaterials = [];
        this.selectedFields = [];
    }

}

export default PieceMoveControls;