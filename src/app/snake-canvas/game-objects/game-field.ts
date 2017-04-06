import {GameObject} from "./game-object";
import {Position} from "./position";
import {Snake} from "./snake";
import {Food} from "./food/food";
export class GameField {

  public ctx: CanvasRenderingContext2D;
  public gameObjects: GameObject[] = [];
  public gameObjectsForDelete: GameObject[] = [];
  public size: Position = new Position(0,0);

  public snakes: Snake[] = [];
  public foods: Food[] = [];

  constructor (ctx: CanvasRenderingContext2D, xSize: number, ySize: number) {
    this.ctx = ctx;
    this.size.x = xSize;
    this.size.y = ySize;
  }

  public gameActionTurn(): void {
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.beforeTurn() ); this.deleteMarkeElements();
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.turn() );       this.deleteMarkeElements();
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.afterTurn() );  this.deleteMarkeElements();
  }

  public gameFrameDraw(): void {
    this.gameObjects.forEach( (gameObject: GameObject) => {
      if (gameObject.isDrawable) gameObject.draw()
    });
  }

  public add(gameObject: GameObject):void {
    this.gameObjects.push( gameObject );
         if (gameObject instanceof Snake) this.snakes.push(gameObject);
    else if (gameObject instanceof Food ) this.foods.push(gameObject);
  }

  private del(gameObject: GameObject):void {
    this.rmFromArr(this.gameObjects, gameObject);
         if (gameObject instanceof Snake) this.rmFromArr(this.snakes, gameObject);
    else if (gameObject instanceof Food ) this.rmFromArr(this.foods, gameObject);
  }

  private rmFromArr(arr: any[], obj: any) {
    const i = arr.indexOf(obj);
    if (i !== -1) arr.splice(i, 1);
  }


  public markForDelete(gameObject: GameObject) {
    this.gameObjectsForDelete.push( gameObject );
  };

  private deleteMarkeElements(): void {
    if (this.gameObjectsForDelete.length === 0) { return; }

    this.gameObjectsForDelete.forEach( it => this.del( it ) );
  }

}
