import Game from "../Game";
import Fruit from "./Fruit";

export default class Banana extends Fruit{
  points: 0;
  height: number;
  width: number;

  updateState() {
    const hasCollided = this.checkCollision();
    if (hasCollided) {
    } else {
      this.y += this.speed;
    }
  }

  constructor(game: Game) {
    const width = 61;
    const height = 67;

    const sprite = <HTMLImageElement>document.querySelector("#banana");
    const availableSpace = game.canvas.width - 2 * width;
    const x = width + availableSpace * Math.random();
    const y = -height;
    const position = { x, y };
    super(game, sprite, position);
    this.width = width;
    this.height = height;
  }
}
