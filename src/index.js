import ChessBoard from './objects/ChessBoard';

const THREE = require("three-js")(["OrbitControls", "OBJLoader"]);

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

camera.position.z = 8;
camera.position.y = 5;
camera.rotation.x = -.4;

const controls = new THREE.OrbitControls( camera, renderer.domElement );

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

    if( intersects.length > 0 ) console.log( board.getFieldByPosition( intersects[0].object.getFieldPosition() ) );

    renderer.render( scene, camera );
}
animate();