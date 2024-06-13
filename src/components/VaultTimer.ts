import { Container, Text, Ticker } from "pixi.js";

export default class VaultTimer extends Container {
  private ticker?: Ticker;
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
    this.ticker = new Ticker();
    this.ticker.start();
    this.ticker.add((ticker) => {
      this.time += (1 / 60) * ticker.deltaTime;
      this.updateVisualTimer();
    });
  }
  updateVisualTimer() {
    let totalSeconds = Math.floor(this.time);
    totalSeconds %= 3600;
    let minutes = ("" + Math.floor(totalSeconds / 60)).padStart(2, "0");
    let seconds = ("" + (totalSeconds % 60)).padStart(2, "0");

    this.text.text = `${minutes}:${seconds}`;
  }
  private start() {
    this.ticker?.start();
  }
  stop() {
    this.ticker?.stop();
  }
  reset() {
    this.time = 0;
    this.updateVisualTimer();
    this.start();
  }
}
