import ChessBoard from './objects/ChessBoard';
import ChessUtils from './objects/ChessUtils';
import PieceMoveControls from './PieceMoveControls';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//const THREE = require("three-js")(["OrbitControls", "OBJLoader"]);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x362a24 );
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
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 1000;
scene.add( light );

const board = new ChessBoard();
board.position.set( -4, 0, -4 );
scene.add( board );

camera.position.z = 8;
camera.position.y = 5;
camera.rotation.x = -.4;

window.addEventListener( 'mousedown', ( e ) => { console.log('test') }, false );

let controls = new OrbitControls( camera, renderer.domElement );

//board.setUp( 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' );
board.setUp( 'rn2k1r1/ppp1pp1p/3p2p1/5bn1/P7/2N2B2/1PPPPP2/2BNK1RR w Gkq - 4 11' );
const moveControls = new PieceMoveControls( camera, renderer.domElement, board );
moveControls.addEventListener( 'dragstart', function () { controls.enabled = false; } );
moveControls.addEventListener( 'dragend', function ( event ) {
    if(event.position) {
        board.getFieldByPosition( event.object.fenPosition ).piece = null;
        board.placePiece( event.position, event.object );
    } 
    controls.enabled = true; 
} );

console.log( board.getFieldByPositionCoordinates( 0, 0 ) );

// Renders
const animate = function () {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
}
animate();