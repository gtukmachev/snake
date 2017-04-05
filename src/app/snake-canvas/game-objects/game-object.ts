import {Position} from "./position";
import {GameField} from "./game-field";
export abstract class GameObject {

  abstract isDrawable: boolean = true;

  public field: GameField;
  public position: Position;

  abstract draw(): void;

  abstract beforeTurn(): void;
  abstract turn(): void;
  abstract afterTurn(): void;

  constructor (field: GameField, x: number, y: number) {
    this.field = field;
    this.position = new Position(x,y);
  }


  // draw helper methods
  public drawCircle (x: number, y: number, radius: number, fillStyle: string | CanvasGradient | CanvasPattern) {
    this.field.ctx.beginPath();
    this.field.ctx.fillStyle = fillStyle;
    this.field.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.field.ctx.fill();
  }

  public moveTo(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    // todo: add implementation for grid indexing objects
  }

  public moveToSafe(positionX: number, positionY: number) {
    let x = positionX; if (x < 0) x = 0; if (x > this.field.size.x) x = this.field.size.x;
    let y = positionY; if (y < 0) y = 0; if (y > this.field.size.y) y = this.field.size.y;
    this.position.x = x;
    this.position.y = y;

    // todo: add implementation for grid indexing objects
  }

}
