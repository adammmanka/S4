import * as THREE from "three";
import { World } from "../world/World";
import { PlayerController } from "../controllers/PlayerController";
import { UIManager } from "../ui/UIManager";
import { RaycasterManager } from "../interaction/RaycasterManager";

export class Game {
  constructor(companies) {
    // Store company data
    this.companies = companies;

    // Create the renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    // Create the scene and camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Initialize game components
    this.world = null;
    this.playerController = null;
    this.uiManager = null;
    this.raycasterManager = null;

    // Animation loop
    this.clock = new THREE.Clock();
  }

  init() {
    // Set up the scene
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue

    // Create the world with buildings based on company data
    this.world = new World(this.scene, this.companies);
    this.world.build();

    // Set up player controller
    this.playerController = new PlayerController(this.camera);
    this.playerController.init();

    // Set up UI manager
    this.uiManager = new UIManager(this.companies);

    // Set up raycaster for interaction
    this.raycasterManager = new RaycasterManager(
      this.camera,
      this.scene,
      this.uiManager
    );

    // Position camera at player start position
    this.camera.position.set(0, 2, 10);
  }

  start() {
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    // Update player controller
    this.playerController.update(delta);

    // Update raycaster
    this.raycasterManager.update();

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    // Update camera aspect ratio
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Update renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
