import Drawable from "./Drawable";
import Game from "./Game";
import Player from "./Player";

export default abstract class Drop implements Drawable {
  context: CanvasRenderingContext2D;
  sprite: HTMLImageElement;
  x: number;
  y: number;
  speed: number;
  player: Player;
  eject: Function;
  dropHeight: number;

  abstract width:number;
  abstract height: number;

  draw() {
    this.context.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  checkOffBounds(){
    return this.dropHeight === this.y;
  }
  
  abstract updateState(): void;

  constructor(
    game: Game,
    sprite: HTMLImageElement,
    position: { x: number; y: number },
    speed: number
  ) {
    this.context = game.context;
    this.sprite = sprite;
    this.x = position.x;
    this.y = position.y;
    this.player = game.player;
    this.speed = speed;
    this.dropHeight = game.canvas.height;
    this.eject = function (drawable: Drawable){
      game.deleteDrawable(drawable)
    }
  }
}
