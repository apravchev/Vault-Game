import { Application } from "pixi.js";

export default class Game {
  private application: Application;
  private background;
  private door;
  private handle;
  constructor(application: Application) {
    this.application = application;
    this.startUp();
  }
  private startUp() {
    this.loadAssets();
  }
  private loadAssets() {}
}
