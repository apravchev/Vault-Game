import { Container, Sprite } from "pixi.js";

export default interface BaseSprite {
  onResize: () => void;
  setup: () => void;
}
