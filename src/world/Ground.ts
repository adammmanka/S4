import * as THREE from "three";

export class Ground {
  private mesh: THREE.Mesh;

  constructor(width: number, depth: number) {
    // Create ground geometry
    const geometry = new THREE.PlaneGeometry(width, depth, 32, 32);

    // Create ground material
    const material = new THREE.MeshStandardMaterial({
      color: 0x7cba7c, // Light green
      roughness: 0.8,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    // Create mesh
    this.mesh = new THREE.Mesh(geometry, material);

    // Rotate to be horizontal
    this.mesh.rotation.x = -Math.PI / 2;

    // Enable shadows
    this.mesh.receiveShadow = true;

    // Add user data for raycasting
    this.mesh.userData = { type: "ground" };
  }

  getMesh(): THREE.Mesh {
    return this.mesh;
  }
}
