import { Application, Assets, Sprite } from "pixi.js";
import Game from "./core/Game";

// Create a new application

document.addEventListener("DOMContentLoaded", async () => {
  const app = new Application();
  await app.init({
    background: "#62947D",
    resizeTo: window,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });
  document.querySelector("#display")?.appendChild(app.canvas);
  const game = new Game(app);
  await game.startUp();
  // window.addEventListener("resize", () => {
  //   const display = document.querySelector("#display") as HTMLElement;
  //   display.style.setProperty(
  //     "--scale",
  //     "" + Math.max(2, 1920 / window.innerWidth)
  //   );
  // });
});
