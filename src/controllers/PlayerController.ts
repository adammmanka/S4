import * as THREE from "three";

export class PlayerController {
  private camera: THREE.PerspectiveCamera;
  private moveSpeed: number = 10;
  private lookSpeed: number = 0.1;

  private moveForward: boolean = false;
  private moveBackward: boolean = false;
  private moveLeft: boolean = false;
  private moveRight: boolean = false;

  private velocity: THREE.Vector3 = new THREE.Vector3();
  private direction: THREE.Vector3 = new THREE.Vector3();

  private euler: THREE.Euler = new THREE.Euler(0, 0, 0, "YXZ");
  private isPointerLocked: boolean = false;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  init(): void {
    // Set up pointer lock controls
    document.addEventListener("click", () => {
      if (!this.isPointerLocked) {
        document.body.requestPointerLock();
      }
    });

    document.addEventListener("pointerlockchange", () => {
      this.isPointerLocked = document.pointerLockElement === document.body;
    });

    // Set up mouse movement for camera rotation
    document.addEventListener("mousemove", (event) => {
      if (this.isPointerLocked) {
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        this.euler.setFromQuaternion(this.camera.quaternion);

        this.euler.y -= movementX * 0.002 * this.lookSpeed;
        this.euler.x -= movementY * 0.002 * this.lookSpeed;

        // Limit vertical rotation
        this.euler.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, this.euler.x)
        );

        this.camera.quaternion.setFromEuler(this.euler);
      }
    });

    // Set up keyboard controls
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "KeyW":
          this.moveForward = true;
          break;
        case "KeyS":
          this.moveBackward = true;
          break;
        case "KeyA":
          this.moveLeft = true;
          break;
        case "KeyD":
          this.moveRight = true;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "KeyW":
          this.moveForward = false;
          break;
        case "KeyS":
          this.moveBackward = false;
          break;
        case "KeyA":
          this.moveLeft = false;
          break;
        case "KeyD":
          this.moveRight = false;
          break;
      }
    });
  }

  update(delta: number): void {
    if (!this.isPointerLocked) return;

    // Calculate movement direction
    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();

    // Apply movement based on camera direction
    const speed = this.moveSpeed * delta;

    if (this.moveForward || this.moveBackward) {
      this.velocity.z = -this.direction.z * speed;
    } else {
      this.velocity.z = 0;
    }

    if (this.moveLeft || this.moveRight) {
      this.velocity.x = this.direction.x * speed;
    } else {
      this.velocity.x = 0;
    }

    // Move the camera
    this.camera.position.addScaledVector(
      this.getForwardVector(),
      this.velocity.z
    );
    this.camera.position.addScaledVector(
      this.getRightVector(),
      this.velocity.x
    );

    // Keep the camera at a fixed height
    this.camera.position.y = 2;
  }

  private getForwardVector(): THREE.Vector3 {
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(this.camera.quaternion);
    forward.y = 0;
    forward.normalize();
    return forward;
  }

  private getRightVector(): THREE.Vector3 {
    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(this.camera.quaternion);
    right.y = 0;
    right.normalize();
    return right;
  }
}
