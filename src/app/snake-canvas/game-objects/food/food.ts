import {GameObject} from "../game-object";
import {GameField} from "../game-field";
import {TimeCounter} from "../time-counter";
export class Food extends GameObject {
  public isDrawable: boolean = true;

  private static sizeKoef = 1.1;
  private static incKoef = 1.1; // it have to be > 1 !!!!!

  private _size: number = 5;
  private sizeForDraw: number;
  private color: string;
  private radialGradient: CanvasGradient;

  private maxAdd  = 0;
  private addSize = 0;
  private incSize = +1;

  private timeCounter = new TimeCounter(100);


  constructor (field: GameField, x: number, y: number, size: number, color: string) {
    super(field, x, y);
    this.color = color;
    this.size = size;
  }

  draw (): void {

    this.prepareForDraw();
    //this.drawCircle( this.position.x, this.position.y, this.sizeForDraw, this.color);
    this.drawCircle( this.position.x, this.position.y, this.sizeForDraw + this.addSize, this.radialGradient);

  }


  beforeTurn (): void {
    if (this.timeCounter.isItTime()) {
      this.timeCounter.fixLastChecking()
      this.addSize += this.incSize;
      if ( Math.abs(this.addSize) > this.maxAdd) {
        this.incSize = (-1) * this.incSize;
        this.addSize += this.incSize;
      }

    }
  }

  turn (): void {}

  afterTurn (): void {}

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
    this.radialGradient.addColorStop(0, this.color);
    this.radialGradient.addColorStop(1, 'transparent');
  }
}
