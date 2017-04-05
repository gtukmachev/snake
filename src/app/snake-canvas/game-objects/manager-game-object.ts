import {GameObject} from "./game-object";
import {GameField} from "./game-field";
export class ManagerGameObject extends GameObject {

  public isDrawable: boolean = false;


  constructor (field: GameField) {
    super(field, 0, 0);
  }


  draw (): void { }

  beforeTurn (): void { }

  turn (): void { }

  afterTurn (): void { }
}
