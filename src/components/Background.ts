import { Container } from "pixi.js";
import Game from "../core/Game";

export default class Background extends Container {
  private game: Game;
  constructor(game: Game) {
    super();
    this.game = game;
  }
}
