import { Application, Assets } from "pixi.js";
import Vault from "../components/Vault";

export default class Game {
  private app: Application;
  private vault!: Vault;
  private combination: number[] = [];
  constructor(application: Application) {
    this.app = application;
    window.addEventListener("resize", () => {
      this.onResize();
    });
  }
  generateCombination() {
    for (let i = 0; i < 3; i++) {
      this.combination[i] = Math.random() * 9;
    }
  }
  async onResize() {
    this.app.stage.x = window.innerWidth / 2;
    this.app.stage.y = window.innerHeight / 2;
    this.vault.onResize();
  }
  async startUp() {
    await this.loadAssets();
    this.vault = new Vault(this);
    this.app.stage.addChild(this.vault);

    this.onResize();
  }
  private async loadAssets() {
    Assets.backgroundLoad("/assets/blink.png");
    Assets.backgroundLoad("/assets/doorOpen.png");
    Assets.backgroundLoad("/assets/doorOpenShadow.png");
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
