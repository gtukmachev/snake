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
    // this.field.ctx.translate(100,100);
    if (!this.field.cameraPos.equals( this.field.cameraInitialPos )){
      this.field.ctx.translate( this.field.cameraInitialPos.x - this.field.cameraPos.x, this.field.cameraInitialPos.y - this.field.cameraPos.y );
    }

  }

  beforeTurn (): void {
  }

  turn (): void {
  }

  afterTurn (): void {
  }
}
