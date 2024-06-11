import { Container, Sprite, Texture } from "pixi.js";

export default class Background extends Container {
  sprite: Sprite;
  constructor() {
    super();
    this.sprite = new Sprite(Texture.from("bg"));
    this.setupPosition();
  }
  setupPosition() {
    this.sprite.height = window.innerHeight;
    this.sprite.width = window.innerWidth;
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = window.innerWidth / 2;
    this.sprite.y = window.innerHeight / 2;
    this.addChild(this.sprite);
  }
}
