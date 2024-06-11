import { Container, Sprite, Texture } from "pixi.js";

export default class Door extends Container {
  sprite: Sprite;
  constructor() {
    super();
    this.sprite = new Sprite(Texture.from("door"));
    this.setupPosition();
  }
  setupPosition() {
    this.sprite.height = window.innerHeight / 2;
    this.sprite.width = window.innerWidth / 2;
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = window.innerWidth / 2;
    this.sprite.y = window.innerHeight / 2;
    this.addChild(this.sprite);
  }
}
