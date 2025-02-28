import * as THREE from "three";
import { World } from "../world/World";
import { PlayerController } from "../controllers/PlayerController";
import { UIManager } from "../ui/UIManager";
import { RaycasterManager } from "../interaction/RaycasterManager";
import { Company } from "../types/Company";

export class Game {
  private companies: Company[];
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private world: World | null;
  private playerController: PlayerController | null;
  private uiManager: UIManager | null;
  private raycasterManager: RaycasterManager | null;
  private clock: THREE.Clock;

  constructor(companies: Company[]) {
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

  init(): void {
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

  start(): void {
    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    // Update player controller
    if (this.playerController) {
      this.playerController.update(delta);
    }

    // Update raycaster
    if (this.raycasterManager) {
      this.raycasterManager.update();
    }

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  handleResize(): void {
    // Update camera aspect ratio
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Update renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
