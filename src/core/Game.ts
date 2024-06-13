import { Application, Assets, Ticker } from "pixi.js";
import Vault from "../components/Vault";

export default class Game {
  private app: Application;
  private vault!: Vault;
  private combination: number[] = [];
  private input: number[] = [];
  constructor(application: Application) {
    this.app = application;
    window.addEventListener("resize", () => {
      this.onResize();
    });
  }
  private reset() {
    console.clear();
    this.generateCombination();
    this.vault.reset();
    this.input = [];
  }
  private counterToString(counter: number[]) {
    let comboString = "";
    counter.forEach((num: number, i: number) => {
      {
        comboString +=
          Math.abs(num) +
          (num > 0 ? " clockwise" : " counterclockwise") +
          (i < 2 ? ", " : "");
      }
    });
    console.log(comboString);
  }
  private generateCombination() {
    for (let i = 0; i < 3; i++) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 19) - 9; // Generates numbers from -9 to 9 inclusive
      } while (randomNumber === 0); // Repeat if the number is 0

      this.combination[i] = randomNumber;
    }
    this.counterToString(this.combination);
  }
  addNumber(num: number) {
    this.input.push(num);
    if (num !== this.combination[this.input.length - 1]) {
      this.reset();
    } else {
      this.counterToString(this.input);
    }
    if (this.input.length >= 3) {
      this.onVictory();
    }
  }
  private onVictory() {
    this.vault.onVictory();
    let seconds = 0;
    const ticker = new Ticker();
    ticker.add((ticker: Ticker) => {
      seconds += (1 / 60) * ticker.deltaTime;
      if (seconds >= 6) {
        seconds = 0;
        this.reset();
        ticker.destroy();
      }
    });
    ticker.start();
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
    this.reset();
    this.onResize();
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
      Assets.load({
        alias: "open_door",
        src: "/assets/doorOpen.png",
      }),
      Assets.load({
        alias: "open_door_shadow",
        src: "/assets/doorOpenShadow.png",
      }),
      Assets.load({
        alias: "blink",
        src: "/assets/blink.png",
      }),
    ]);
  }
}
