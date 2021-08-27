import Game from "../Game";
import Fruit from "./Fruit";

export default class Banana extends Fruit{
  points: number;
  height: number;
  width: number;

  doubleScore: Function;

  updateState() {
    const hasCollided = this.checkCollision();
    if (this.checkOffBounds()) {
      this.eject(this);
    }
    if (hasCollided) {
      this.eject(this);
      this.doubleScore();
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
    this.points = 0;
    this.doubleScore = () => game.score = game.score*2;
  }
}
