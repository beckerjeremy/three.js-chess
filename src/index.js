import ChessBoard from './objects/ChessBoard';
import ChessPawn from './objects/ChessPawn';
import DragControls from 'drag-controls';

const THREE = require("three-js")(["OrbitControls", "OBJLoader"]);
DragControls.install({THREE: THREE});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild( renderer.domElement );

// Objects

const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
scene.add( ambientLight );

const board = new ChessBoard();
scene.add( board );

const pawn = new ChessPawn( 0xff0000 );
scene.add( pawn );


const pawn1 = new ChessPawn( 'white' );
scene.add( pawn1 );

camera.position.z = 8;
camera.position.y = 5;
camera.rotation.x = -.4;

board.getFieldByPosition('B1').piece = pawn1;
pawn1.fieldPosition = 'B1';
pawn1.position.set( board.getFieldByPosition('B1').position.x, board.getFieldByPosition('B1').position.y, board.getFieldByPosition('B1').position.z );
board.getFieldByPosition('A2').piece = pawn;
pawn.fieldPosition = 'A2';
pawn.position.set( board.getFieldByPosition('A2').position.x, board.getFieldByPosition('A2').position.y, board.getFieldByPosition('A2').position.z );
console.log( pawn.getPossibleMoves(board) )

// Controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
const dragControls = new DragControls( [pawn], camera, renderer.domElement );
dragControls.addEventListener( 'dragstart', function () { controls.enabled = false; } );
dragControls.addEventListener( 'dragend', function () { controls.enabled = true; } );
dragControls.addEventListener( 'drag', function ( event ) { event.object.position.y = 0.05 } );

// Events
window.addEventListener( 'mousemove', ( event ) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );

// Render

const animate = function () {
    requestAnimationFrame( animate );

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( board.children );

    //if( intersects.length > 0 ) console.log( board.getFieldByPosition( intersects[0].object.getFieldPosition() ) );

    renderer.render( scene, camera );
}
animate();