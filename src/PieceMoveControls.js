import * as THREE from 'three';

class PieceMoveControls extends THREE.EventDispatcher {

    constructor( camera, domElement, board ) {
        super();
        this.camera = camera;
        this.board = board;
        this.mouse = new THREE.Vector2();
        this.selectedFields = [];
        this.replacedMaterials = [];
        this.selectedPiece = null;

        this.raycaster = new THREE.Raycaster();

        domElement.addEventListener( 'pointerdown', ( e ) => { e.preventDefault(); this.onMouseDown( e ); }, false );
        domElement.addEventListener( 'pointermove', ( e ) => { e.preventDefault(); this.onMouseMove( e ); }, false );
        domElement.addEventListener( 'pointerup', ( e ) => { e.preventDefault(); this.onMouseUp( e ); }, false );
        domElement.addEventListener( 'mouseleave', ( e ) => { e.preventDefault(); this.onMouseUp( e ); }, false );
    }

    onMouseDown( event ) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.mouse, this.camera );
        let intersects = this.raycaster.intersectObjects( this.board.getPieces() );

        if( intersects.length > 0 ) {
            this.selectedPiece = intersects[0].object;
            let fields = intersects[0].object.getPossibleMoves( this.board );

            for( let i = 0; i < fields.length; i++ ) {
                this.replacedMaterials.push( fields[i].material );
                this.selectedFields.push( fields[i] );
                fields[i].material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
            }
        }

        if( this.selectedPiece ) this.dispatchEvent( { type: "dragstart", object: this.selectedPiece } );
    }

    onMouseMove( event ) {
        if( this.selectedPiece ) this.dispatchEvent( { type: "drag", object: this.selectedPiece } );
    }

    onMouseUp( event ) {
        for( let i = 0; i < this.selectedFields.length; i++ ) {
            let field = this.selectedFields[i];
            field.material = this.replacedMaterials[i];
        }

        if( this.selectedPiece ) this.dispatchEvent( { type: "dragend", object: this.selectedPiece } );

        this.selectedPiece = null;
        this.replacedMaterials = [];
        this.selectedFields = [];
    }

    onTouchStart( event ) {
        this.onMouseDown( event );
    }

    onTouchMove( event ) {
        this.onMouseMove( event );
    }

    onTouchEnd( event ) {
        this.onMouseUp( event );
    }

}

export default PieceMoveControls;