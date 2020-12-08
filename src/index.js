import ChessBoard from './objects/ChessBoard';
import ChessPawn from './objects/ChessPawn';
import ChessKnight from './objects/ChessKnight';
import DragControls from 'drag-controls';

const THREE = require("three-js")(["OrbitControls", "OBJLoader"]);
DragControls.install({THREE: THREE});

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x222222 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild( renderer.domElement );

// Objects

const ambientLight = new THREE.AmbientLight( 0xffffff, .2 );
scene.add( ambientLight );

const light  = new THREE.PointLight( 0xffffff, 1, 60 );
light.position.set( 0, 10, 0 );
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add( light );

const board = new ChessBoard();
board.position.set( -4, 0, -4 );
scene.add( board );

camera.position.z = 8;
camera.position.y = 5;
camera.rotation.x = -.4;

const controls = new THREE.OrbitControls( camera, renderer.domElement );

//board.setUp( 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' );
board.setUp( 'rn2k1r1/ppp1pp1p/3p2p1/5bn1/P7/2N2B2/1PPPPP2/2BNK1RR w Gkq - 4 11' );

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

    //if( intersects.length > 0 ) console.log( board.getFieldByPosition( intersects[0].object.getFenPosition() ) );

    renderer.render( scene, camera );
}
animate();