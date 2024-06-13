import gsap from "gsap";
import { Container, Sprite, Texture } from "pixi.js";

export default class Sparks extends Container {
  private texture: Texture;
  private sprites: Sprite[] = [];
  private animations: GSAPTween[] = [];
  constructor() {
    super();
    this.texture = Texture.from("blink");
    for (let i = 0; i < 3; i++) {
      this.sprites[i] = new Sprite({
        texture: this.texture,
        anchor: 0.5,
        scale: 0.5,
      });
    }
    this.setup();
  }
  private setup() {
    this.setupPositions();
    this.setupAnimation();
    this.sprites.forEach((sprite) => {
      this.addChild(sprite);
    });
  }
  setupPositions() {
    this.sprites[0].position.set(-20, 100);
    this.sprites[1].position.set(250, 200);
    this.sprites[2].position.set(-320, -100);
  }
  play() {
    this.animations.forEach((tween) => {
      tween.play();
    });
  }
  pause() {
    this.animations.forEach((tween) => {
      tween.pause();
    });
  }
  private setupAnimation() {
    this.sprites.forEach((sprite, idx) => {
      this.animations.push(
        gsap.to(sprite, {
          pixi: {
            scale: 1,
          },
          repeat: -1,
          duration: 1,
          yoyo: true,
          delay: idx / 2,
        })
      );
    });
  }
}
