import * as PIXI from "pixi.js";
import Game from "./core/Game";
import gsap from "gsap";
import { PixiPlugin } from "gsap/all";

// Create a new application

document.addEventListener("DOMContentLoaded", async () => {
  PixiPlugin.registerPIXI(PIXI);
  gsap.registerPlugin(PixiPlugin);
  const app = new PIXI.Application();
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
});
