import { Container, Sprite, Texture } from "pixi.js";
import BaseSprite from "./BaseSprite";

export default class Door extends Container implements BaseSprite {
  private sprite: Sprite;
  private container: Container;
  constructor(container: Container) {
    super();
    this.container = container;
    this.sprite = new Sprite({
      texture: Texture.from("door"),
      anchor: { x: 0.465, y: 0.52 },
    });
    this.setupPosition();
  }
  setupPosition() {
    this.onResize();
    this.addChild(this.sprite);
  }
  setup() {
    this.onResize();
  }
  onResize() {}
}
