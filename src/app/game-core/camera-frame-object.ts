import {GameObject} from './game-object';
import {SnakeGame} from '../snake/snake-canvas/game-objects/snake-game';

export class CameraFrameObject extends GameObject {

  public isDrawable = true;
  public color: string | CanvasGradient | CanvasPattern;

  constructor (field: SnakeGame, color: string | CanvasGradient | CanvasPattern) {
    super(field, 0, 0);
    this.color = color;
  }


  draw (): void {
    const ctx = this.field.ctx;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.strokeRect( this.field.cameraPos.x - this.field.cameraActorFrame.x, this.field.cameraPos.y - this.field.cameraActorFrame.y,
      this.field.cameraActorFrame.x * 2, this.field.cameraActorFrame.y * 2,
    );

  }

  beforeTurn (): void {
  }

  turn (): void {
  }

  afterTurn (): void {
  }
}
