import { Application, Assets } from "pixi.js";
import Vault from "../components/Vault";

export default class Game {
  private app: Application;
  private vault!: Vault;
  constructor(application: Application) {
    this.app = application;

    this.onResize();
  }
  onResize() {
    this.app.resize();
  }
  async startUp() {
    await this.loadAssets();
    this.vault = new Vault(this);
    this.app.stage.addChild(this.vault);
  }
  private async loadAssets() {
    return Promise.all([
      Assets.load({
        alias: "bg",
        src: "/assets/bg.png",
      }),
      Assets.load({
        alias: "door",
        src: "/assets/door.png",
      }),
      Assets.load({
        alias: "handle",
        src: "/assets/handle.png",
      }),
      Assets.load({
        alias: "handle_shadow",
        src: "/assets/handleShadow.png",
      }),
    ]);
  }
}
