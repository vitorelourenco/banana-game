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
  keepPlaying: boolean;
  lives: number;

  start() {
    this.enablePlaying();
    this.resetLastTick();
    this.resetLives();
    this.clearDrawables();
    this.resetPlayer();
    this.resetScore();
    this.requestFrames();
  }

  resetLives(){
    this.lives = 4;
    const domLives = document.querySelectorAll(".life-points");
    domLives.forEach((life:HTMLImageElement)=>{
      life.src = "sprites/heart.png";
    });
  }

  dropLife(game:Game){
    console.log(game.lives);
    game.lives -= 1;
    const domLives = document.querySelectorAll(".life-points");
    for(let i = game.lives ; i>=0; i--){
      if(domLives[i].getAttribute("src") === "sprites/heart.png"){
        domLives[i].setAttribute("src", "sprites/heart-empty.png");
        break;
      }
    }
    if(game.lives === 0) game.endGame();
  }

  resetLastTick(){
    this.lastTickTime = Date.now();
  }

  enablePlaying(){
    this.keepPlaying = true;
  }

  increaseScore(game: Game, amount: number) {
    game.score = game.score + amount;
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
    if (this.keepPlaying) {
      window.requestAnimationFrame(()=>game.gameLoop(game));
    }
  }

  endGame(){
    this.keepPlaying = false;
    let id = window.requestAnimationFrame(()=>{})
    while(id--){
      window.cancelAnimationFrame(id);
    }
  }

  renderGame() {
    this.clearScreen();
    this.updateScore();
    this.player.draw();
    this.drawables.forEach((d) => d.draw());
    this.drawBaseLine();
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

  drawBaseLine(){
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(5, 730);
    ctx.lineTo(370, 730);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
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
