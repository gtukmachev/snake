import {GameObject} from "./game-object";
import {GameField} from "./game-field";

export class BackGround extends GameObject{

  public isDrawable: boolean = true;


  constructor (field: GameField) {
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
