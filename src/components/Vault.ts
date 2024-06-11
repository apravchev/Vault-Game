import { Assets, Container, Sprite, Texture } from "pixi.js";

export default class Vault extends Container {
  private background: Sprite;
  private door: Sprite;
  private handle: {
    shadow: Sprite;
    real: Sprite;
  };

  constructor() {
    super();
    this.background = new Sprite(Texture.from("bg"));
    this.door = new Sprite(Texture.from("door"));
    this.handle = {
      shadow: new Sprite(Texture.from("handle_shadow")),
      real: new Sprite(Texture.from("handle")),
    };
  }
  setup() {}
}
