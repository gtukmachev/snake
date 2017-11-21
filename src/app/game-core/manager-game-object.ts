import {GameObject} from './game-object';
import {Game} from './game';
export class ManagerGameObject extends GameObject {

  public isDrawable: boolean = false;

  constructor (field: Game) {
    super(field, 0, 0);
  }


  draw (): void { }

  beforeTurn (): void { }

  turn (): void { }

  afterTurn (): void { }
}
