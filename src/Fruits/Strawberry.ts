import Game from "../Game";
import Fruit from "./Fruit";

export default class Strawberry extends Fruit{
  points: 30;
  height: number;
  width: number;

  constructor(game: Game) {
    const width = 66;
    const height = 66;

    const sprite = <HTMLImageElement>document.querySelector("#strawberry");
    const availableSpace = game.canvas.width - 2 * width;
    const x = width + availableSpace * Math.random();
    const y = -height;
    const position = { x, y };
    super(game, sprite, position);
    this.width = width;
    this.height = height;
  }
}
