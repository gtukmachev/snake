import {SnakeGame} from '../snake-game';
import {ManagerGameObject} from '../../../../game-core/manager-game-object';
import {Food} from './food';
import {TimeCounter} from '../../../../game-core/time-counter';


export class FoodManager extends ManagerGameObject {

  timeCounter: TimeCounter = new TimeCounter(500); // ms
  public field: SnakeGame;

  constructor (field: SnakeGame) {
    super(field);
  }


  beforeTurn (): void {
    if (this.timeCounter.isItTime()) {
      this.timeCounter.fixLastChecking();
      if (this.field.foods.length < 5) {
        for (let i = 0; i < 100; i++) { this.makeFood(); }
      } else if (this.field.foods.length <= 300) {
          this.makeFood();
      }
    }
  }

  makeFood(): void {
    const food = new Food(
      this.field,
      Math.round(Math.random() * (this.field.size.x - 20)) + 10,
      Math.round(Math.random() * (this.field.size.y - 20)) + 10,
      Math.round(Math.random() * 2) + 1,
      '#38ff6c',
      '#ff9575'
    );

    this.field.add(food);

  }



}
