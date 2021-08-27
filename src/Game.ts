import Drawable from "./Drawable";
import Player from "./Player";
import Bomb from "./Bomb";
import Fruits from "./Fruits/Fruits";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  drawables: Drawable[];
  player: Player;
  score: number;
  lastTickTime: number;
  lastDropTime: number;
  scoreBoard: HTMLElement;

  start() {
    this.resetLastTick();
    this.clearDrawables();
    this.resetPlayer();
    this.resetScore();
    this.requestFrames();
  }

  resetLastTick(){
    this.lastTickTime = Date.now();
  }

  increaseScore(amount: number) {
    this.score += amount;
  }

  resetPlayer() {
    this.player = new Player(this);
  }

  resetScore() {
    this.score = 0;
  }

  updateScore(){
    this.scoreBoard.innerHTML = `Score ${this.score}`;
  }

  clearDrawables() {
    this.drawables = [];
  }

  cancelAllAnimationFrames() {
    let id = window.requestAnimationFrame(() => {});
    while (id--) {
      window.cancelAnimationFrame(id);
    }
  }

  requestFrames() {
    this.cancelAllAnimationFrames();
    window.requestAnimationFrame(()=>{
      this.gameLoop(this);
    });
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameLoop(game:Game) {
    if (Date.now() - game.lastTickTime < 16) {
      window.requestAnimationFrame(()=>game.gameLoop(game));
      return;
    }
    game.lastTickTime = Date.now();
    game.updateState();
    game.renderGame();
    const canContinue = game.askToContinue();
    if (canContinue) {
      window.requestAnimationFrame(()=>game.gameLoop(game));
    } else {
      game.endGame();
    }
  }

  askToContinue() {
    //NOT IMPLEMENTED
    return true;
  }

  endGame() {
    //NOT IMPLEMENTED
  }

  renderGame() {
    this.clearScreen();
    this.player.draw();
    this.drawables.forEach((d) => d.draw());
  }

  updateState() {
    if (Date.now() - this.lastDropTime > 1500){
      if(Math.random() < 0.8){
        this.spawnFruit();
      } else {
        this.spawnBomb();
      }
      this.lastDropTime = Date.now();
    }
    this.updateScore();
    this.player.updateState();
    this.drawables.forEach((d) => d.updateState(this));
  }

  spawnFruit() {
    const newFruit = (() => {
      const random = Math.random();
      if (random < 0.3) return new Fruits.Orange(this);
      if (random < 0.6) return new Fruits.Apple(this);
      if (random < 0.8) return new Fruits.Watermelon(this);
      if (random < 0.95) return new Fruits.Strawberry(this);
      return new Fruits.Banana(this);
    })();
    this.drawables.push(newFruit);
  }

  spawnBomb(){
    this.drawables.push(new Bomb(this));
  }

  deleteDrawable(drawable: Drawable) {
    this.drawables = this.drawables.filter((d) => d !== drawable);
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.height = 747;
    this.canvas.width = 375;
    this.context = canvas.getContext("2d");
    this.drawables = [];
    this.score = 0;
    const now = Date.now();
    this.lastTickTime = now;
    this.lastDropTime = now;
    this.scoreBoard = document.querySelector("#score")
  }
}
