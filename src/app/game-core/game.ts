import {GameObject} from './game-object';
import {Position} from './position';
export class Game {

  public ctx: CanvasRenderingContext2D;
  public gameObjects: GameObject[] = [];
  public gameObjectsForDelete: GameObject[] = [];
  public size: Position = new Position(0, 0);

  constructor (ctx: CanvasRenderingContext2D, xSize: number, ySize: number) {
    this.ctx = ctx;
    this.size.x = xSize;
    this.size.y = ySize;
  }

  public gameActionTurn(): void {
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.beforeTurn() ); this.deleteMarkedElements();
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.turn() );       this.deleteMarkedElements();
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.afterTurn() );  this.deleteMarkedElements();
  }

  public gameFrameDraw(): void {
    this.gameObjects.forEach( (gameObject: GameObject) => {
      if (gameObject.isDrawable) { gameObject.draw(); }
    });
  }

  public add(gameObject: GameObject): void {
    this.gameObjects.push( gameObject );
  }

  protected del(gameObject: GameObject): void {
    this.rmFromArr(this.gameObjects, gameObject);
  }

  protected rmFromArr(arr: any[], obj: any) {
    const i = arr.indexOf(obj);
    if (i !== -1) { arr.splice(i, 1); }
  }


  public markForDelete(gameObject: GameObject) {
    this.gameObjectsForDelete.push( gameObject );
  };

  private deleteMarkedElements(): void {
    if (this.gameObjectsForDelete.length === 0) { return; }

    this.gameObjectsForDelete.forEach( it => this.del( it ) );
  }

}
