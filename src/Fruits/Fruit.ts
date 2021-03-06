import Drop from "../Drop";
import Game from "../Game";

export default abstract class Fruit extends Drop {
  abstract points: number;

  checkCollision: Function;
  addToScore: Function;
  dropLife: Function;

  updateState() {
    const hasCollided = this.checkCollision();
    if (this.checkOffBounds()) {
      this.eject(this);
      this.dropLife();
    }
    if (hasCollided) {
      this.eject(this);
      this.addToScore();
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
    this.addToScore = () => game.increaseScore(game, this.points);
    this.checkCollision = () => game.player.checkCollision(this);
    this.dropLife = () => game.dropLife(game);
  }
}
