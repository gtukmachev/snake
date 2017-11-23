import {GameObject} from '../../../game-core/game-object';
import {Game} from '../../../game-core/game';
import {Snake} from './snake';
import {Food} from './food/food';
import {SimpleBackGround} from '../../../game-core/simple-back-ground';
import {FoodManager} from './food/food-manager';

export class SnakeGame extends Game {


  backGround: SimpleBackGround;
  snake: Snake;
  foodManager: FoodManager;


  public snakes: Snake[] = [];
  public foods: Food[] = [];

  constructor (ctx: CanvasRenderingContext2D, xSize: number, ySize: number) {
    super(ctx, xSize, ySize);


    this.backGround  = new  SimpleBackGround(this, '#fdffe3');
    this.snake       = new       Snake(this, Math.floor(xSize / 2), Math.floor(ySize / 2) );
    this.foodManager = new FoodManager(this);

    this.add( this.foodManager );
    this.add( this.backGround  );
    this.add( this.snake       );

  }

  public onMouseMove(event: MouseEvent): void {
    super.onMouseMove(event);
    this.snake.setDirection(this.mousePos.x, this.mousePos.y);
  }

  public onMouseDown(event: MouseEvent): void {
    super.onMouseDown(event);
    this.snake.setDirection(this.mousePos.x, this.mousePos.y);
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
