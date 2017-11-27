import {GameObject} from './game-object';
import {SnakeGame} from '../snake/snake-canvas/game-objects/snake-game';

export class WorldFrameObject extends GameObject {

  public isDrawable = true;
  public color: string | CanvasGradient | CanvasPattern;

  constructor (field: SnakeGame, color: string | CanvasGradient | CanvasPattern) {
    super(field, 0, 0);
    this.color = color;
  }


  draw (): void {
    const ctx = this.field.ctx;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.strokeRect( 0,0, this.field.worldSize.x, this.field.worldSize.y);

  }

  beforeTurn (): void {
  }

  turn (): void {
  }

  afterTurn (): void {
  }
}
