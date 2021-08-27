import Drawable from "./Drawable";
import Game from "./Game";

export default class Player implements Drawable {
  x: number;
  y: number;
  radius: number;
  sprite: HTMLImageElement;
  context: CanvasRenderingContext2D;
  leftRequested: boolean;
  rightRequested: boolean;
  lastRequested: number;
  speed: number;
  height: 97;
  width: 64;

  draw() {
    this.context.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  onKeyDown(e: KeyboardEvent, player: Player) {
    if (e.key === "ArrowRight") {
      player.lastRequested = 1;
      player.rightRequested = true;
    }
    if (e.key === "ArrowLeft") {
      player.lastRequested = 0;
      player.leftRequested = true;
    }
  }

  onKeyUp(e: KeyboardEvent, player: Player) {
    if (e.key === "ArrowRight") {
      player.rightRequested = false;
    }
    if (e.key === "ArrowLeft") {
      player.leftRequested = false;
    }
  }

  updateState() {
    const futureX = this.x + this.speed;

    if (futureX < this.context.canvas.width - 66 && futureX > 0) {
      this.x = futureX;
    }
    if (this.lastRequested === 0 && this.leftRequested) {
      this.sprite = document.querySelector("#alienLeft");
      this.speed = -5;
    }
    if (this.lastRequested === 1 && this.rightRequested) {
      this.sprite = document.querySelector("#alien");
      this.speed = 5;
    }
    if (!this.rightRequested && !this.leftRequested) {
      this.speed = 0;
    }
  }

  checkCollision(rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    return (
      this.x < rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y < rect.y + rect.height &&
      this.y + this.height > rect.y
    );
  }

  constructor(game: Game) {
    this.context = game.context;
    this.x = 50;
    this.y = 630;
    this.speed = 0;
    this.width = 64;
    this.height = 97;
    this.radius = 64;
    this.sprite = document.querySelector("#alien");
    window.addEventListener("keydown", (e) => this.onKeyDown(e, this));
    window.addEventListener("keyup", (e) => this.onKeyUp(e, this));
  }
}
