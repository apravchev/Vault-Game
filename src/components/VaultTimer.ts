import { Container, Text, Ticker } from "pixi.js";

export default class VaultTimer extends Container {
  private ticker!: Ticker;
  private text: Text;
  private time: number;
  constructor() {
    super();
    this.text = new Text({
      text: "00:00",
      style: {
        fontSize: "120px",
      },
      x: -1320,
      y: -430,
    });
    this.time = 0;
    this.setup();
  }
  setup() {
    this.addChild(this.text);
  }
  updateVisualTimer() {
    let totalSeconds = Math.floor(this.time);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    this.text.text = `${minutes}:${seconds}`;
  }
  start() {
    this.ticker = new Ticker();
    this.ticker.start();
    this.ticker.add((ticker) => {
      this.time += (1 / 60) * ticker.deltaTime;
      this.updateVisualTimer();
    });
  }
  stop() {
    this.ticker.destroy();
  }
  reset() {
    this.text.text = "00:00";
  }
}
