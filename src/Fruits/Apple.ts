import Fruit from "./Fruit";
import Game from "../Game";

export default class Apple extends Fruit {
  points: 10;
  height: number;
  width: number;

  constructor(game: Game) {
    const width = 60;
    const height = 67;

    const sprite = <HTMLImageElement>document.querySelector("#red-apple");
    const availableSpace = game.canvas.width - 2 * width;
    const x = width + availableSpace * Math.random();
    const y = -height;
    const position = { x, y };
    super(game, sprite, position);
    this.width = width;
    this.height = height;
  }
}
