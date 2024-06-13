import { Assets, Container, Sprite, Texture } from "pixi.js";
import Game from "../core/Game";
import Background from "../sprites/Background";
import Door from "../sprites/Door";
import Handle from "../sprites/Handle";
import gsap from "gsap";
import OpenDoor from "../sprites/OpenDoor";
import OpenVault from "./OpenVault";
import VaultTimer from "./VaultTimer";

export default class Vault extends Container {
  private background: Background;
  private door: Door;
  private game: Game;
  private handle: Handle;
  private openVault: OpenVault;
  private vaultTimer: VaultTimer;
  constructor(game: Game) {
    super();
    this.game = game;
    this.background = new Background(this);
    this.door = new Door();
    this.handle = new Handle(this);
    this.openVault = new OpenVault();
    this.vaultTimer = new VaultTimer();
    this.setupPositions();
    this.setupInteractions();
  }
  setupPositions() {
    this.onResize();
    this.addChild(this.background);
    this.addChild(this.door);
    this.addChild(this.handle);
    this.addChild(this.openVault);
    this.addChild(this.vaultTimer);
  }
  setupInteractions() {}
  onResize() {
    this.background.onResize();
  }
  onWheelSpin(input: number) {
    this.game.addNumber(input);
  }
  reset() {
    this.openVault.visible = false;
    this.door.visible = true;
    this.handle.visible = true;

    gsap.to([this.door, this.handle], {
      pixi: {
        scaleX: 1,
        x: 0,
      },
      duration: 0.2,
      onComplete: () => {
        this.openVault.onHide();
        this.vaultTimer.reset();
      },
    });
    this.handle.triggerInteractivity(false);
    gsap.to(this.handle, {
      pixi: {
        rotation: 1080,
      },
      duration: 1,
      onComplete: () => {
        this.handle.triggerInteractivity(true);
        this.handle.rotation = 0;
      },
    });
  }
  onVictory() {
    this.handle.triggerInteractivity(false);
    this.vaultTimer.stop();
    gsap.to([this.door, this.handle], {
      pixi: {
        scaleX: 0.7,
        x: 100,
      },
      duration: 1,
      onComplete: () => {
        (this.door.visible = false), (this.handle.visible = false);
        this.openVault.visible = true;
        this.openVault.onActive();
      },
    });
  }
}
