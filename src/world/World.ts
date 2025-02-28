import * as THREE from "three";
import { Company } from "../types/Company";
import { Building } from "./Building";
import { Ground } from "./Ground";
import { Sky } from "./Sky";

export class World {
  private scene: THREE.Scene;
  private companies: Company[];
  private buildings: Building[] = [];
  private ground: Ground | null = null;
  private sky: Sky | null = null;

  constructor(scene: THREE.Scene, companies: Company[]) {
    this.scene = scene;
    this.companies = companies;
  }

  build(): void {
    // Create ground
    this.ground = new Ground(100, 100);
    this.scene.add(this.ground.getMesh());

    // Create sky
    this.sky = new Sky(500);
    this.scene.add(this.sky.getMesh());

    // Create buildings for each company
    this.companies.forEach((company) => {
      const building = new Building(company);
      this.buildings.push(building);
      this.scene.add(building.getMesh());
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 200, 100);
    directionalLight.castShadow = true;

    // Configure shadow properties
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;

    this.scene.add(directionalLight);

    // Add roads and other city elements
    this.addRoads();
  }

  private addRoads(): void {
    // Create a road material
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
    });

    // Main horizontal road
    const mainRoadGeometry = new THREE.BoxGeometry(100, 0.1, 5);
    const mainRoad = new THREE.Mesh(mainRoadGeometry, roadMaterial);
    mainRoad.position.set(0, 0.05, 0);
    mainRoad.receiveShadow = true;
    this.scene.add(mainRoad);

    // Main vertical road
    const crossRoadGeometry = new THREE.BoxGeometry(5, 0.1, 100);
    const crossRoad = new THREE.Mesh(crossRoadGeometry, roadMaterial);
    crossRoad.position.set(0, 0.05, 0);
    crossRoad.receiveShadow = true;
    this.scene.add(crossRoad);

    // Add some smaller roads connecting to buildings
    this.companies.forEach((company) => {
      const { x, z } = company.address.coordinates;

      // Skip if the building is already on a main road
      if (Math.abs(x) < 2.5 || Math.abs(z) < 2.5) return;

      // Determine which main road to connect to
      const isConnectToHorizontal = Math.abs(z) < Math.abs(x);

      if (isConnectToHorizontal) {
        // Connect to horizontal road
        const roadLength = Math.abs(z);
        const roadGeometry = new THREE.BoxGeometry(3, 0.1, roadLength);
        const road = new THREE.Mesh(roadGeometry, roadMaterial);
        road.position.set(x, 0.05, z / 2);
        road.receiveShadow = true;
        this.scene.add(road);
      } else {
        // Connect to vertical road
        const roadLength = Math.abs(x);
        const roadGeometry = new THREE.BoxGeometry(roadLength, 0.1, 3);
        const road = new THREE.Mesh(roadGeometry, roadMaterial);
        road.position.set(x / 2, 0.05, z);
        road.receiveShadow = true;
        this.scene.add(road);
      }
    });
  }

  getBuildings(): Building[] {
    return this.buildings;
  }
}
