import {Pos} from './position';
import {Game} from './game';
export abstract class GameObject {

  abstract isDrawable = true;

  public field: Game;

  public position: Pos;
  public speed: number = 2;                     // movement speed (in pixels)
  public speedVector: Pos = new Pos(1,0);       // movement vector speed (length = speed )
  public directionVector: Pos = new Pos(1,0);   // direction vector (length = 1)

  abstract draw(): void;

  abstract beforeTurn(): void;
  abstract turn(): void;
  abstract afterTurn(): void;

  constructor (field: Game, x: number, y: number) {
    this.field = field;
    this.position = new Pos(x, y);
  }

  // movement helper methods
  setDirection(x: number, y: number): void {
    const vectorX = x - this.position.x;
    const vectorY = y - this.position.y;

    const vectorLen = Math.sqrt( vectorX*vectorX + vectorY*vectorY );

    this.directionVector.x = ( vectorX / vectorLen );
    this.directionVector.y = ( vectorY / vectorLen );

    this.speedVector.x = this.directionVector.x * this.speed;
    this.speedVector.y = this.directionVector.y * this.speed;

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
