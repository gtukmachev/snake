import {Position} from './position';
import {Game} from './game';
export abstract class GameObject {

  abstract isDrawable = true;

  public field: Game;
  public position: Position;

  abstract draw(): void;

  abstract beforeTurn(): void;
  abstract turn(): void;
  abstract afterTurn(): void;

  constructor (field: Game, x: number, y: number) {
    this.field = field;
    this.position = new Position(x, y);
  }


  // draw helper methods
  public drawCircle (x: number, y: number, radius: number, fillStyle: string | CanvasGradient | CanvasPattern) {
    this.field.ctx.beginPath();
    this.field.ctx.fillStyle = fillStyle;
    this.field.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.field.ctx.fill();
  }

  public strokeCircle (x: number, y: number, radius: number, strokeStyle: string | CanvasGradient | CanvasPattern) {
    this.field.ctx.beginPath();
    this.field.ctx.lineWidth = 1;
    this.field.ctx.strokeStyle = strokeStyle;
    this.field.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.field.ctx.stroke();
  }

  public moveTo(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    // todo: add implementation for grid indexing objects
  }

  public moveToSafe(positionX: number, positionY: number) {
    let x = positionX; if (x < 0) { x = 0; } if (x > this.field.size.x) { x = this.field.size.x; }
    let y = positionY; if (y < 0) { y = 0; } if (y > this.field.size.y) { y = this.field.size.y; }
    this.position.x = x;
    this.position.y = y;

    // todo: add implementation for grid indexing objects
  }

}
