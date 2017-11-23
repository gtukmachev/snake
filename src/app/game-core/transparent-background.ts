import {GameObject} from './game-object';
import {Game} from './game';

export class TransparentBackground extends GameObject {

  public isDrawable = true;
  public color: string | CanvasGradient | CanvasPattern;

  constructor (game: Game) {
    super(game, 0, 0);
  }


  draw (): void {
    // Draw background: optimized 'magic' hack-version
    this.field.canvas.width = this.field.canvas.width;
  }

  beforeTurn (): void {
  }

  turn (): void {
  }

  afterTurn (): void {
  }
}
