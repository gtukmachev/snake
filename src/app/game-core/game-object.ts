import {Pos} from './position';
import {Game} from './game';
export abstract class GameObject {

  abstract isDrawable = true;

  public field: Game;

  public p: Pos;
  public speed: number = 2;                     // movement speed (in pixels)
  public speedVector: Pos = new Pos(1,0);       // movement vector speed (length = speed )
  public directionVector: Pos = new Pos(1,0);   // direction vector (length = 1)

  abstract draw(): void;

  abstract beforeTurn(): void;
  abstract turn(): void;
  abstract afterTurn(): void;

  constructor (game: Game, x: number, y: number) {
    this.field = game;
    this.p = new Pos(x, y);
  }

  // movement helper methods
  setDirection(x: number, y: number): void {
    const vectorX = x - this.p.x;
    const vectorY = y - this.p.y;

    const vectorLen = Math.sqrt( vectorX*vectorX + vectorY*vectorY );

    this.directionVector.x = ( vectorX / vectorLen );
    this.directionVector.y = ( vectorY / vectorLen );

    this.speedVector.x = this.directionVector.x * this.speed;
    this.speedVector.y = this.directionVector.y * this.speed;

  }

  public moveTo(x: number, y: number) {
    this.p.x = x;
    this.p.y = y;
    // todo: add implementation for grid indexing objects
  }

  public moveToSafe(x: number, y: number) {
    moveTo(x, y);
    this.moveReturnOnField();
    // todo: add implementation for grid indexing objects
  }

  public moveForward() {
    this.p.x += this.speedVector.x;
    this.p.y += this.speedVector.y;
    // todo: add implementation for grid indexing objects
  }

  public moveForwardSafe() {
    this.p.x += this.speedVector.x;
    this.p.y += this.speedVector.y;
    this.moveReturnOnField();
    // todo: add implementation for grid indexing objects
  }

  public moveReturnOnField() {
    if (this.p.x < 0) {this.p.x = 0; } else {if (this.p.x > this.field.worldSize.x) { this.p.x = this.field.worldSize.x; }}
    if (this.p.y < 0) {this.p.y = 0; } else {if (this.p.y > this.field.worldSize.y) { this.p.y = this.field.worldSize.y; }}
    // todo: add implementation for grid indexing objects
  }

  // draw helper methods
  public fillCircle (x: number, y: number, radius: number, fillStyle: string | CanvasGradient | CanvasPattern) {
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

  public fcCircle (x: number, y: number, radius: number, strokeStyle: string | CanvasGradient | CanvasPattern, fillStyle: string | CanvasGradient | CanvasPattern) {
    const ctx = this.field.ctx;
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;

    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
/*
  public fcCircle (x: number, y: number, radius: number, strokeStyle: string | CanvasGradient | CanvasPattern, fillStyle: string | CanvasGradient | CanvasPattern) {
    const circle = new Path2D();
    circle.arc(x, y, radius, 0, Math.PI * 2);
    this.field.ctx.fillStyle = fillStyle;
    this.field.ctx.strokeStyle = strokeStyle;
    this.field.ctx.fill(circle);
    this.field.ctx.stroke(circle);
  }
*/

}
