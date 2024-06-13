import { Container } from "pixi.js";
import OpenDoor from "../sprites/OpenDoor";
import Sparks from "../sprites/Sparks";

export default class OpenVault extends Container {
  private openDoor: OpenDoor;
  private sparks: Sparks;
  constructor() {
    super();
    this.openDoor = new OpenDoor();
    this.sparks = new Sparks();
    this.setupPositions();
    this.sparks.pause();
  }
  setupPositions() {
    this.addChild(this.openDoor);
    this.addChild(this.sparks);
  }
  onActive() {
    this.sparks.play();
  }
  onHide() {
    this.sparks.pause();
  }
}
