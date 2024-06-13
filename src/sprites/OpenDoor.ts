import { Container, Sprite, Texture } from "pixi.js";

export default class OpenDoor extends Container {
  private sprite: Sprite;
  private shadow: Sprite;
  constructor() {
    super();
    const texture = Texture.from("open_door");
    const textureShadow = Texture.from("open_door_shadow");
    this.sprite = new Sprite({
      texture,
      anchor: 0.5,
      x: 1500,
      y: -50,
    });
    this.shadow = new Sprite({
      texture: textureShadow,
      anchor: 0.5,
      y: 20,
      x: 1560,
    });
    this.setup();
  }
  setup() {
    this.addChild(this.shadow);
    this.addChild(this.sprite);
  }
}
