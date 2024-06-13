import { Container, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";

export default class Background extends Container {
  private sprite: Sprite;
  private container: Container;
  private texture: Texture;
  constructor(container: Container) {
    super();
    this.container = container;
    this.texture = Texture.from("bg");
    this.sprite = new Sprite({
      texture: this.texture,
      anchor: 0.5,
    });
    this.setup();
  }
  onResize() {
    this.container.scale = window.innerWidth / this.texture.width;
  }
  setup() {
    this.onResize();
    this.addChild(this.sprite);
  }
  getScale() {
    return this.sprite.scale;
  }
}
