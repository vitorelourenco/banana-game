import Fruit from "./Fruit";
import Game from "../Game";

export default class Orange extends Fruit{
  points: 5;
  height: number;
  width: number;

  constructor(game: Game) {
    const width = 64;
    const height = 67;

    const sprite = <HTMLImageElement>document.querySelector("#orange");
    const availableSpace = game.canvas.width - 2 * width;
    const x = width + availableSpace * Math.random();
    const y = -height;
    const position = { x, y };
    super(game, sprite, position);
    this.width = width;
    this.height = height;
  }
}
