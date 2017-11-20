import {GameObject} from "../../../../game-core/game-object";
import {SnakeGameField} from "../snake-game-field";
import {TimeCounter} from "../time-counter";
import {Snake, SnakeElement} from "../snake";

export class Food extends GameObject {
  private static sizeKoef = 3;
  private static incKoef = 1.1; // it have to be > 1 !!!!!

  public isDrawable: boolean = true;
  public field: SnakeGameField;

  private _size: number = 5;
  private eatPerTern = 1;


  private sizeForDraw: number;
  private color: string;
  private activeColor: string;
  private radialGradient: CanvasGradient;

  private maxAdd  = 0;
  private addSize = 0;
  private incSize = +1;

  private timeCounter = new TimeCounter(100);

  public active: boolean = false;

  constructor (field: SnakeGameField, x: number, y: number, size: number, color: string, activeColor: string) {
    super(field, x, y);
    this.color = color;
    this.activeColor = activeColor;
    this.size = size;
  }

  draw (): void {

    this.prepareForDraw();
    // this.drawCircle( this.position.x, this.position.y, this.sizeForDraw, this.color);
    this.drawCircle( this.position.x, this.position.y, this.sizeForDraw + this.addSize, this.radialGradient);

  }


  beforeTurn (): void {
    if (this._size <= 0) { return; }

    if (this.timeCounter.isItTime()) {
      this.timeCounter.fixLastChecking();
      this.addSize += this.incSize;
      if ( Math.abs(this.addSize) > this.maxAdd) {
        this.incSize = (-1) * this.incSize;
        this.addSize += this.incSize;
      }

    }
  }

  turn (): void {}

  afterTurn (): void {
    if (this._size <= 0) { return; }

    const snakesTouched: Snake[] = this.field.snakes.filter( snake => this.isInZone(snake) );

    this.active = snakesTouched.length > 0;


    if (this.active) {

      let s = this.size;

      snakesTouched.forEach( snake => {
        if (s > 0) {
          snake.increase(this.eatPerTern)
          s -= this.eatPerTern;
        }
      });

      if (s > 0) {
        this.size = s;
      } else {
        this.size = 0;
        this.isDrawable = false;
        this.field.markForDelete(this);
      }

    }

  }

  isInZone(snake: Snake): boolean {
    const distance = this.position.distanceTo( snake.head.position );
    return distance < ( this.sizeForDraw + this.addSize + snake.snakeFat );
  }

  get size (): number {
    return this._size;
  }

  set size (value: number) {
    this._size = value;
    this.sizeForDraw = Math.round(this._size * Food.sizeKoef);
    this.maxAdd = Math.round(this.sizeForDraw * Food.incKoef) - this.sizeForDraw;
  }

  private prepareForDraw(): void {
    this.radialGradient  = this.field.ctx.createRadialGradient(
      this.position.x, this.position.y, (this.sizeForDraw + this.addSize) / 3,
      this.position.x, this.position.y, (this.sizeForDraw + this.addSize)    ,
    );
    this.radialGradient.addColorStop(0, this.active ? this.activeColor : this.color);
    this.radialGradient.addColorStop(1, 'transparent');
  }
}
