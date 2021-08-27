import Fruit from "./Fruit";
import Game from "../Game";

export default class Watermelon extends Fruit{
  points: 20;
  height: number;
  width: number;

  constructor(game: Game) {
    const width = 82;
    const height = 67;
    
    const sprite = <HTMLImageElement>document.querySelector("#watermelon");
    const availableSpace = game.canvas.width - 2 * width;
    const x = width + availableSpace * Math.random();
    const y = -height;
    const geometry = { x, y };
    super(game, sprite, geometry);
    this.width = width;
    this.height = height;
  }
}
