import {GameObject} from "../game-object";
import {GameField} from "../game-field";
export class Food extends GameObject {
  public isDrawable: boolean = true;

  private static sizeKoef = 1.3;

  private _size: number = 5;
  private sizeForDraw: number;
  private color: string;
  private radialGradient: CanvasGradient;

  private addSize = 0;
  private incSize = +1;
  private frameCounter = 0;


  constructor (field: GameField, x: number, y: number, size: number, color: string) {
    super(field, x, y);
    this.color = color;
    this.size = size;
  }

  draw (): void {

    this.prepareForDraw();
    //this.drawCircle( this.position.x, this.position.y, this.sizeForDraw, this.color);
    this.drawCircle( this.position.x, this.position.y, this.sizeForDraw, this.radialGradient);

  }


  beforeTurn (): void {
    this.addSize += this.incSize;
    if ( Math.abs(this.addSize) > 10) {
      this.incSize = (-1) * this.incSize;
      this.addSize += this.incSize;
    }

  }

  turn (): void {}

  afterTurn (): void {}

  get size (): number {
    return this._size;
  }

  set size (value: number) {
    this._size = value;
    this.sizeForDraw = this._size * Food.sizeKoef;
  }

  private prepareForDraw(): void {
    this.radialGradient  = this.field.ctx.createRadialGradient(
      this.position.x, this.position.y, this.sizeForDraw/3,
      this.position.x, this.position.y, this.sizeForDraw + this.addSize,
    );
    this.radialGradient.addColorStop(0, this.color);
    this.radialGradient.addColorStop(1, 'transparent');
  }
}
