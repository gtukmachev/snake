import {GameObject} from '../../../game-core/game-object';
import {SnakeGameField} from './snake-game-field';

export class BackGround extends GameObject {

  public isDrawable: boolean = true;

  constructor (field: SnakeGameField) {
    super(field, 0, 0);
  }


  draw (): void {
    // Draw background (which also effectively clears any previous drawing)
    this.field.ctx.fillStyle = '#fdffe3';
    this.field.ctx.fillRect(0, 0, this.field.size.x, this.field.size.y);
  }

  beforeTurn (): void {
  }

  turn (): void {
  }

  afterTurn (): void {
  }
}
