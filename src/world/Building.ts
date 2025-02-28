import * as THREE from "three";
import { Company } from "../types/Company";

export class Building {
  private mesh: THREE.Group;
  private company: Company;

  constructor(company: Company) {
    this.company = company;
    this.mesh = new THREE.Group();

    this.createBuilding();
  }

  private createBuilding(): void {
    const { buildingWidth, buildingHeight, buildingDepth, logoColor } =
      this.company;
    const { x, z } = this.company.address.coordinates;

    // Create main building structure
    const buildingGeometry = new THREE.BoxGeometry(
      buildingWidth,
      buildingHeight,
      buildingDepth
    );

    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.3,
      metalness: 0.2,
    });

    const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
    buildingMesh.position.set(0, buildingHeight / 2, 0);
    buildingMesh.castShadow = true;
    buildingMesh.receiveShadow = true;

    // Add the building to the group
    this.mesh.add(buildingMesh);

    // Add company logo on top
    this.addLogo(logoColor, buildingWidth, buildingHeight, buildingDepth);

    // Add windows
    this.addWindows(buildingWidth, buildingHeight, buildingDepth);

    // Set the building position in the world
    this.mesh.position.set(x, 0, z);

    // Add company data as user data for raycasting
    this.mesh.userData = {
      type: "building",
      companyId: this.company.id,
      company: this.company,
    };
  }

  private addLogo(
    color: string,
    width: number,
    height: number,
    depth: number
  ): void {
    // Create a simple colored cube as the logo
    const logoSize = Math.min(width, depth) * 0.3;
    const logoGeometry = new THREE.BoxGeometry(logoSize, logoSize, logoSize);
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.1,
      metalness: 0.8,
      emissive: new THREE.Color(color).multiplyScalar(0.2),
    });

    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, height + logoSize / 2, 0);
    logo.castShadow = true;

    this.mesh.add(logo);
  }

  private addWindows(width: number, height: number, depth: number): void {
    // Window properties
    const windowWidth = 0.8;
    const windowHeight = 0.8;
    const windowDepth = 0.1;

    // Window material
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x88ccff,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
      emissive: 0x88ccff,
      emissiveIntensity: 0.2,
    });

    // Calculate number of windows based on building size
    const windowsPerFloor = Math.max(2, Math.floor(width / 2));
    const floors = Math.max(1, Math.floor(height / 1.5));

    // Create windows for each side of the building
    const sides = [
      { direction: "front", x: 0, z: depth / 2 + 0.01, rotY: 0 },
      { direction: "back", x: 0, z: -depth / 2 - 0.01, rotY: Math.PI },
      { direction: "left", x: -width / 2 - 0.01, z: 0, rotY: -Math.PI / 2 },
      { direction: "right", x: width / 2 + 0.01, z: 0, rotY: Math.PI / 2 },
    ];

    sides.forEach((side) => {
      for (let floor = 0; floor < floors; floor++) {
        const floorHeight = (floor + 0.5) * (height / floors);

        const windowsOnThisSide =
          side.direction === "front" || side.direction === "back"
            ? windowsPerFloor
            : Math.max(2, Math.floor(depth / 2));

        for (let w = 0; w < windowsOnThisSide; w++) {
          const windowGeometry = new THREE.BoxGeometry(
            windowWidth,
            windowHeight,
            windowDepth
          );
          const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);

          // Position windows evenly along the side
          const offset = (windowsOnThisSide - 1) / 2;
          const spacing =
            side.direction === "front" || side.direction === "back"
              ? width
              : depth;
          const position = (w - offset) * (spacing / windowsOnThisSide);

          if (side.direction === "front" || side.direction === "back") {
            windowMesh.position.set(position, floorHeight, side.z);
          } else {
            windowMesh.position.set(side.x, floorHeight, position);
          }

          windowMesh.rotation.y = side.rotY;
          this.mesh.add(windowMesh);
        }
      }
    });
  }

  getMesh(): THREE.Group {
    return this.mesh;
  }
}
