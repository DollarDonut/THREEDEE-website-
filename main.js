import './style.css'

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry( 10, 3, 16,100)
const geometry1 = new THREE.CapsuleGeometry( 3.5, 5, 17,95)
const geometry2 = new THREE.IcosahedronGeometry( 4, 10, 23,95)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347, wireframe: true } );
const material1 = new THREE.MeshStandardMaterial( {color: 0xF8DE22, wireframe: false } );
const material2 = new THREE.MeshStandardMaterial( {color:0xD67BFF, wireframe: true} );
const torus = new THREE.Mesh( geometry, material );
const CapsuleGeometry = new THREE.Mesh( geometry1, material1);
const IcosahedronGeometry = new THREE.Mesh( geometry2, material2);
const IcosahedronGeometry2 = new THREE.Mesh( geometry2, material2);

torus.position.setX(-20);
CapsuleGeometry.position.setX(20);
IcosahedronGeometry.position.setY(10);
IcosahedronGeometry2.position.setY(-10);

scene.add(torus, CapsuleGeometry, IcosahedronGeometry, IcosahedronGeometry2);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridhelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridhelper)

const controls = new OrbitControls(camera, renderer.domElement);

controls.maxDistance = 100; 
controls.minDistance = 10; 

const stars = []

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 400 ) );

    star.position.set(x, y, z);
    star.translateX(90)
    star.translateY(50)
    
    scene.add(star)

}

Array(200).fill().forEach(addStar)


function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    CapsuleGeometry.rotation.x += 0.03;
    CapsuleGeometry.rotation.z += 0.05;

    IcosahedronGeometry.rotation.x += 0.002;
    IcosahedronGeometry.rotation.y += 0.006;

    IcosahedronGeometry2.rotation.x += 0.002;
    IcosahedronGeometry2.rotation.y += 0.006;
    

    controls.update()
    
    renderer.render( scene, camera );
}

const fbxLoader = new FBXLoader()
// fbxLoader.load(
//     'ToyBlock.fbx',
//     (object) => {
//         // object.traverse(function (child) {
//         //     if ((child as THREE.Mesh).isMesh) {
//         //         // (child as THREE.Mesh).material = material
//         //         if ((child as THREE.Mesh).material) {
//         //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
//         //         }
//         //     }
//         // })
//         // object.scale.set(.01, .01, .01)
//         scene.add(object)
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//     },
//     (error) => {
//         console.log(error)
//     }
// )
const widget = document.querySelector('.widget');
let scrollYPrev = window.scrollY;
let widgetY = 0;

function updateWidgetPosition() {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - scrollYPrev;
    const maxOffset = 100; // Adjust the maximum offset

    widgetY = Math.min(Math.max(widgetY - scrollDelta, -maxOffset), maxOffset);

    widget.style.transform = `translate(-50%, calc(-50% + ${widgetY}px))`;

    scrollYPrev = scrollY;
    requestAnimationFrame(updateWidgetPosition);
}

updateWidgetPosition();

window.addEventListener('scroll', function() {
    // Throttle the scroll event to improve performance
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(function() {
        updateWidgetPosition();
    }, 10);
});



animate()

console.log("Het Werkt")