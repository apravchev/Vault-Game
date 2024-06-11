import { Application, Assets, Sprite } from "pixi.js";
import Game from "./core/Game";

// Create a new application

document.addEventListener("DOMContentLoaded", async () => {
  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });
  document.body.appendChild(app.canvas);
  const game = new Game(app);
  await game.startUp();
});
