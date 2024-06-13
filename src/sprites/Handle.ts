import { Container, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import Vault from "../components/Vault";

export default class Handle extends Container {
  private container: Vault;
  private sprite: Sprite;
  private shadow: Sprite;
  private isGrabbed = false;
  private spinCounter = 0;
  private previousAngle = 0;
  private currentAngle = 0;
  private wheelX: number = 0;
  private wheelY: number = 0;
  private angleThreshold = 1; // Small threshold to ignore minor movements

  constructor(container: Vault) {
    super();
    this.container = container;
    const texture = Texture.from("handle");
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(-20, -40);
    this.sprite.interactive = true;
    this.sprite.cursor = "grab";

    this.shadow = new Sprite(Texture.from("handle_shadow"));
    this.shadow.anchor.set(0.5);

    this.setup();
  }
  triggerInteractivity(isInteractive: boolean) {
    this.sprite.interactive = isInteractive;
  }
  private setupPosition() {
    this.addChild(this.shadow);
    this.addChild(this.sprite);
  }

  private startGrab() {
    this.sprite.cursor = "grabbing";
    this.isGrabbed = true;
    this.calculateWheelCenter();
    this.previousAngle = this.calculateAngle(this.sprite.x, this.sprite.y);
  }

  private endGrab() {
    this.sprite.cursor = "grab";
    this.isGrabbed = false;
    if (this.spinCounter != 0) {
      this.container.onWheelSpin(this.spinCounter);
    }
    gsap.to([this.sprite, this.shadow], {
      pixi: {
        rotation: 0,
      },
      duration: 1,
      onComplete: () => {
        this.spinCounter = 0;
        this.currentAngle = 0;
      },
    });
  }

  private setup() {
    this.setupPosition();
    this.sprite.on("pointerdown", (e) => {
      this.startGrab();
    });
    this.sprite.on("pointerup", (e) => {
      this.endGrab();
    });
    window.onblur = () => {
      this.endGrab();
    };
    this.sprite.on("pointermove", (e) => {
      if (this.isGrabbed) {
        this.calcPosition(e.data.global.x, e.data.global.y);
        this.updateRotation();
        console.log(this.spinCounter);
      }
    });
  }

  private calculateWheelCenter() {
    const rect = this.getBounds();
    this.wheelX = rect.x + rect.width / 2;
    this.wheelY = rect.y + rect.height / 2;
  }

  private calculateAngle(currentX: number, currentY: number): number {
    let xLength = currentX - this.wheelX;
    let yLength = currentY - this.wheelY;
    let angle = Math.atan2(yLength, xLength) * (180 / Math.PI);
    return angle < 0 ? 360 + angle : angle;
  }

  private calcPosition(x: number, y: number) {
    let newAngle = this.calculateAngle(x, y);
    let deltaAngle = newAngle - this.previousAngle;

    // Handle wrap-around effect
    if (deltaAngle > 180) {
      deltaAngle -= 360;
    } else if (deltaAngle < -180) {
      deltaAngle += 360;
    }

    // Ignore minor movements
    if (Math.abs(deltaAngle) < this.angleThreshold) {
      return;
    }

    this.currentAngle += deltaAngle;
    this.previousAngle = newAngle;

    // Update spinCounter based on 60-degree increments
    if (Math.abs(this.currentAngle) >= 60) {
      let increments =
        Math.sign(this.currentAngle) *
        Math.floor(Math.abs(this.currentAngle) / 60);
      this.spinCounter += increments;
      this.currentAngle -= increments * 60; // Normalize the current angle within the 0-60 range
    }

    // Clamp the spinCounter to be within -9 to 9
    this.spinCounter = Math.max(-9, Math.min(9, this.spinCounter));
  }

  private updateRotation() {
    this.sprite.rotation =
      (this.spinCounter * 60 + this.currentAngle) * (Math.PI / 180);
    this.shadow.rotation = this.sprite.rotation;
  }
}
