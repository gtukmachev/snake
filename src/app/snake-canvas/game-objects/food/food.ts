import {GameObject} from "../game-object";
import {GameField} from "../game-field";
export class Food extends GameObject {
  public isDrawable: boolean = true;

  private static sizeKoef = 1.3;

  private _size: number = 5;
  private sizeForDraw: number;
  private color: string | CanvasGradient | CanvasPattern = '#76ff75';


  constructor (field: GameField, x: number, y: number, size: number, color:
                 string
                 | CanvasGradient
                 | CanvasPattern) {
    super(field, x, y);
    this.size = size;
    this.color = color;
  }

  draw (): void {

    this.drawCircle( this.position.x, this.position.y, this.sizeForDraw, this.color);

  }


  beforeTurn (): void {}

  turn (): void {}

  afterTurn (): void {}

  get size (): number {
    return this._size;
  }

  set size (value: number) {
    this._size = value;
    this.sizeForDraw = this._size * Food.sizeKoef;
  }
}
