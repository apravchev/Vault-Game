import { Container, Sprite, Texture } from "pixi.js";

export default class Door extends Container {
  private sprite: Sprite;
  constructor() {
    super();
    this.sprite = new Sprite({
      texture: Texture.from("door"),
      anchor: { x: 0.465, y: 0.52 },
    });
    this.setupPosition();
  }
  setupPosition() {
    this.addChild(this.sprite);
  }
  setup() {}
}
