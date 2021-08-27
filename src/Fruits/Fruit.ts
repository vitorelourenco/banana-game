import Drop from "../Drop";
import Game from "../Game";

export default abstract class Fruit extends Drop {
  abstract points: number;

  checkCollision: Function;
  incrementer: Function;

  addToScore() {
    this.incrementer(this.points);
  }

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

  constructor(
    game: Game,
    sprite: HTMLImageElement,
    position: { x: number; y: number }
  ) {
    super(game, sprite, position, 2);
    this.incrementer = game.increaseScore;
    this.checkCollision = () => game.player.checkCollision(this);
  }
}
