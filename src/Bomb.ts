import Drop from "./Drop";
import Game from "./Game";

export default class Bomb extends Drop{
  eject: Function;
  height: number;
  width: number;

  checkCollision: Function;

  updateState() {
    const hasCollided = this.checkCollision();
    if (this.checkOffBounds()) {
      this.eject(this);
    }
    if (hasCollided) {
    } else {
      this.y += this.speed;
    }

  }

  constructor(game: Game) {
    const width = 67;
    const height = 67;

    const sprite = <HTMLImageElement>document.querySelector("#bomb");
    const availableSpace = game.canvas.width - 2 * width;
    const x = width + availableSpace * Math.random();
    const y = -height;
    const position = { x, y };
    super(game, sprite, position, 4);

    this.checkCollision = () => game.player.checkCollision(this);
    this.width = width;
    this.height = height;
  }

}
