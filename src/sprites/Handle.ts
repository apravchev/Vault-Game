import { Container, Sprite, Texture } from "pixi.js";

export default class Handle extends Container {
  sprite: Sprite;
  shadow: Sprite;
  constructor() {
    super();
    this.sprite = new Sprite(Texture.from("handle"));
    this.shadow = new Sprite(Texture.from(""));
    this.setupPosition();
  }
  setupPosition() {
    this.sprite.anchor.set(0.5, 0.5);
    this.shadow.anchor.set(0.51, 0.51);
    this.sprite.x = window.innerWidth / 2;
    this.sprite.y = window.innerHeight / 2;
    this.shadow.x = window.innerWidth / 2;
    this.shadow.y = window.innerHeight / 2;
    this.addChild(this.sprite);
    this.addChild(this.shadow);
  }
}
