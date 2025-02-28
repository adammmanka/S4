import * as THREE from "three";
import { UIManager } from "../ui/UIManager";

export class RaycasterManager {
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private uiManager: UIManager;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private isPointerLocked: boolean = false;
  private selectedObject: THREE.Object3D | null = null;

  constructor(
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    uiManager: UIManager
  ) {
    this.camera = camera;
    this.scene = scene;
    this.uiManager = uiManager;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(0, 0); // Center of screen when pointer is locked

    // Set up event listeners
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Track pointer lock state
    document.addEventListener("pointerlockchange", () => {
      this.isPointerLocked = document.pointerLockElement === document.body;

      // Hide company info when exiting pointer lock
      if (!this.isPointerLocked) {
        this.uiManager.hideCompanyInfo();
        this.resetSelectedObject();
      }
    });

    // Handle clicks for interaction
    document.addEventListener("click", () => {
      if (this.isPointerLocked) {
        this.handleClick();
      }
    });
  }

  update(): void {
    if (!this.isPointerLocked) return;

    // Update the raycaster with the camera direction
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Find intersected objects
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );

    // Reset cursor style
    document.body.style.cursor = "default";

    // Reset previously selected object
    this.resetSelectedObject();

    // Check for intersections
    if (intersects.length > 0) {
      // Find the first object with company data
      for (const intersect of intersects) {
        // Traverse up the parent chain to find an object with company data
        let currentObject: THREE.Object3D | null = intersect.object;

        while (currentObject) {
          if (
            currentObject.userData &&
            currentObject.userData.type === "building" &&
            currentObject.userData.companyId
          ) {
            // Highlight the selected building
            this.selectedObject = currentObject;
            this.highlightObject(currentObject);

            // Change cursor to indicate interactable object
            document.body.style.cursor = "pointer";

            break;
          }

          currentObject = currentObject.parent;
        }

        if (this.selectedObject) break;
      }
    }
  }

  private handleClick(): void {
    if (!this.selectedObject) return;

    // Get company ID from the selected object
    const companyId = this.selectedObject.userData.companyId;

    if (companyId) {
      // Show company info in the UI
      this.uiManager.showCompanyInfo(companyId);
    }
  }

  private highlightObject(object: THREE.Object3D): void {
    // Add a subtle highlight effect
    // This could be enhanced with a custom shader or outline effect
    if (
      object instanceof THREE.Mesh &&
      object.material instanceof THREE.Material
    ) {
      // Store original material properties if needed for resetting
      if (!object.userData.originalEmissive) {
        if (object.material instanceof THREE.MeshStandardMaterial) {
          object.userData.originalEmissive = object.material.emissive.clone();
          object.material.emissive.set(0x222222);
        }
      }
    }
  }

  private resetSelectedObject(): void {
    if (!this.selectedObject) return;

    // Reset any highlight effects
    this.selectedObject.traverse((child: THREE.Object3D) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial &&
        child.userData.originalEmissive
      ) {
        child.material.emissive.copy(child.userData.originalEmissive);
        delete child.userData.originalEmissive;
      }
    });

    this.selectedObject = null;
  }
}
