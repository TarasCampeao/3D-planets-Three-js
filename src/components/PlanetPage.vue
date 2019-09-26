<template>
	<div class="container">
		<h1>Main page</h1>
		<div id="background"></div>
	</div>
</template>


<script>
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import * as dat from 'dat.gui'
import store from '../store'
import sunTexture from "../assets/textures/sun.jpg"
import marsTexture from "../assets/textures/mars.jpg"
import jupiterTexture from "../assets/textures/jupiter.jpg"
import mercuryTexture from "../assets/textures/mercury.jpg"
import venusTexture from "../assets/textures/venus.jpg"
import earthTexture from "../assets/textures/earth.jpg"
import saturnTexture from "../assets/textures/saturn.jpg"
import uranusTexture from "../assets/textures/uranus.jpg"
import neptuneTexture from "../assets/textures/neptune.jpg"


export default {
	name: 'PlanetPage',
	components: {

	},
	data() {
		return {

		}
	},
	mounted() {
		let camera, scene, renderer, controls;
		const planets = [];
		let timestamp = 0;
		const scaleVector = new THREE.Vector3();


		const init = () => {

			let width = window.innerWidth;
			let height = window.innerHeight;

		  scene = new THREE.Scene();
		  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
		  camera.position.set(0, 100, 175);

		  renderer = new THREE.WebGLRenderer({
		    antialias: true
		  });
		  renderer.setSize(width, height);
		  document.body.appendChild(renderer.domElement);

		  controls = new OrbitControls(camera, renderer.domElement);


		  const createPlanet = (name, radius, orbit, speed, texture) => {
		    const geom = new THREE.SphereGeometry(radius, 32, 16);
		    const mat = new THREE.MeshBasicMaterial({
			  map: new THREE.TextureLoader().load(texture)
		    });
		    const planet = new THREE.Mesh(geom, mat);
		    planet.userData.orbit = orbit;
		    planet.userData.speed = speed;

		    const canvas = document.createElement('canvas');
		    canvas.width = 256;
		    canvas.height = 256;
		    const ctx = canvas.getContext("2d");
		    ctx.font = "44pt Arial";
		    ctx.fillStyle = "white";
		    ctx.textAlign = "center";
		    ctx.fillText(name, 128, 44);

		    const tex = new THREE.Texture(canvas);
		    tex.needsUpdate = true;
		    const spriteMat = new THREE.SpriteMaterial({
		      map: tex
		    });
		    const sprite = new THREE.Sprite(spriteMat);

		    planet.add(sprite);
		    planets.push(planet);
		    scene.add(planet);

		    //orbit
		    const shape = new THREE.Shape();
		    shape.moveTo(orbit, 0);
		    shape.absarc(0, 0, orbit, 0, 2 * Math.PI, false);
		    const spacedPoints = shape.createSpacedPointsGeometry(128);
		    spacedPoints.rotateX(THREE.Math.degToRad(-90));
		    const orbitLine = new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
		      color: "white"
		    }));
		    scene.add(orbitLine);
		  };

		  createPlanet("Mercury", 1, 10, 5, mercuryTexture);
		  createPlanet("Venus", 1.5, 20, 3, venusTexture);
		  createPlanet("Earth", 2, 30, 4, earthTexture);
		  createPlanet("Mars", 1.8, 40, 2, marsTexture);
		  createPlanet("Jupiter", 3, 60, 0.8, jupiterTexture);
		  createPlanet("Saturn", 2.5, 70, 0.5, saturnTexture);
		  createPlanet("Uranus", 1.75, 80, 0.4, uranusTexture);
		  createPlanet("Neptune", 0.8, 90, 0.2, neptuneTexture);


		  const sun = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({
		    map: new THREE.TextureLoader().load(sunTexture)
		  }));
		  scene.add(sun);
		}

		const render = () => {
		  renderer.render(scene, camera);
		}

		const animate = () => {
		  timestamp = Date.now() * 0.0001;
		  requestAnimationFrame(animate);
		  planets.forEach(function(planet) {
		    
		    const scaleFactor = 8;
		    const sprite = planet.children[0];
		    const scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
		    sprite.scale.set(scale, scale, 1);
		    const orbit = planet.userData.orbit;
		    const speed = planet.userData.speed;
		    planet.position.x = Math.cos(timestamp * speed) * orbit;
		    planet.position.z = Math.sin(timestamp * speed) * orbit;
		  });
		  render();
		}

		init();
		animate();

			}
	}	
</script>


