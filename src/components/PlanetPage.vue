<template>
	<div class="container">
		<h1>Main page</h1>
		<div id="background"></div>
	</div>
</template>


<script>
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import store from '../store'
import sunTexture from "../2k_sun.jpg"
import marsTexture from "../2k_mars.jpg"
import jupiterTexture from "../2k_jupiter.jpg"
import mercuryTexture from "../2k_mercury.jpg"
import venusTexture from "../2k_venus.jpg"
import earthTexture from "../2k_earth.jpg"
import saturnTexture from "../2k_saturn.jpg"
import uranusTexture from "../2k_uranus.jpg"
import neptuneTexture from "../2k_neptune.jpg"


export default {
	name: 'PlanetPage',
	components: {

	},
	data() {
		return {

		}
	},
	mounted() {
		var camera, scene, renderer, controls;
var planets = [];
var timestamp = 0;
var scaleVector = new THREE.Vector3();

init();
animate();

function init() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 100, 175);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);


  var createPlanet = function(name, radius, orbit, speed, texture) {
    var geom = new THREE.SphereGeometry(radius, 32, 16);
    var mat = new THREE.MeshBasicMaterial({
      //color: Math.random() * 0xFFFFFF,
	  map: new THREE.TextureLoader().load(texture)
      //wireframe: true
    });
    var planet = new THREE.Mesh(geom, mat);
    planet.userData.orbit = orbit;
    planet.userData.speed = speed;

    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    var ctx = canvas.getContext("2d");
    ctx.font = "44pt Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(name, 128, 44);
    //console.log(ctx);
    var tex = new THREE.Texture(canvas);
    tex.needsUpdate = true;
    var spriteMat = new THREE.SpriteMaterial({
      map: tex
    });
    var sprite = new THREE.Sprite(spriteMat);

    planet.add(sprite);
    planets.push(planet);
    scene.add(planet);

    //orbit
    var shape = new THREE.Shape();
    shape.moveTo(orbit, 0);
    shape.absarc(0, 0, orbit, 0, 2 * Math.PI, false);
    var spacedPoints = shape.createSpacedPointsGeometry(128);
    spacedPoints.rotateX(THREE.Math.degToRad(-90));
    var orbit = new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
      color: "white"
    }));
    scene.add(orbit);
  };

  createPlanet("Mercury", 1, 10, 5, mercuryTexture);
  createPlanet("Venus", 1.5, 20, 3, venusTexture);
  createPlanet("Earth", 2, 30, 4, earthTexture);
  createPlanet("Mars", 1.8, 40, 2, marsTexture);
  createPlanet("Jupiter", 3, 60, 0.8, jupiterTexture);
  createPlanet("Saturn", 2.5, 70, 0.5, saturnTexture);
  createPlanet("Uranus", 1.75, 80, 0.4, uranusTexture);
  createPlanet("Neptune", 0.8, 90, 0.2, neptuneTexture);

  //console.log(planets[0].children[0]);

  var sun = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(sunTexture)
  }));
  scene.add(sun);
}

function animate() {
  timestamp = Date.now() * 0.0001;
  requestAnimationFrame(animate);
  planets.forEach(function(planet) {
    
    var scaleFactor = 8;
    var sprite = planet.children[0];
    var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
    sprite.scale.set(scale, scale, 1);
    var orbit = planet.userData.orbit;
    var speed = planet.userData.speed;
    planet.position.x = Math.cos(timestamp * speed) * orbit;
    planet.position.z = Math.sin(timestamp * speed) * orbit;
  });
  render();
}

function render() {
  renderer.render(scene, camera);
}

	}
}	
</script>