import {GameObject} from '../../../game-core/game-object';
import {GameField} from '../../../game-core/game-field';
import {Snake} from './snake';
import {Food} from './food/food';

export class SnakeGameField extends GameField {

  public snakes: Snake[] = [];
  public foods: Food[] = [];

  constructor (ctx: CanvasRenderingContext2D, xSize: number, ySize: number) {
    super(ctx, xSize, ySize);
  }


  public add(gameObject: GameObject): void {
    super.add(gameObject);
         if (gameObject instanceof Snake) { this.snakes.push(gameObject); }
    else if (gameObject instanceof Food ) { this.foods.push(gameObject); }
  }

  protected del(gameObject: GameObject): void {
    super.del(gameObject);
         if (gameObject instanceof Snake) { this.rmFromArr(this.snakes, gameObject); }
    else if (gameObject instanceof Food ) { this.rmFromArr(this.foods, gameObject); }
  }

}
