import { Container, Sprite, Texture } from "pixi.js";

export default class Handle extends Container {
  private container: Container;
  private sprite: Sprite;
  private shadow: Sprite;
  constructor(container: Container) {
    super();
    this.container = container;
    this.sprite = new Sprite({
      texture: Texture.from("handle"),
      anchor: { x: 0.53, y: 0.55 },
    });
    this.shadow = new Sprite({
      texture: Texture.from("handle_shadow"),
      anchor: { x: 0.5, y: 0.53 },
    });
    this.setupPosition();
  }
  setupPosition() {
    this.addChild(this.shadow);
    this.addChild(this.sprite);
  }
  setup() {}
}
