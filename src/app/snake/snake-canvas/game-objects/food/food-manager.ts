import {SnakeGame} from '../snake-game';
import {ManagerGameObject} from '../../../../game-core/manager-game-object';
import {Food} from './food';
import {TimeCounter} from '../../../../game-core/time-counter';


export class FoodManager extends ManagerGameObject {

  timeCounter: TimeCounter = new TimeCounter(1); // ms
  public field: SnakeGame;

  constructor (field: SnakeGame) {
    super(field);
  }


  beforeTurn (): void {
    if (this.timeCounter.isItTime()) {
      this.timeCounter.fixLastChecking();
      if (this.field.foods.length < 10) {
        for (let i = 0; i < 100; i++) { this.makeFood(); }
      } else if (this.field.foods.length <= 100) {
          this.makeFood();
      }
    }
  }

  makeFood(): void {
    const food = new Food(
      this.field,
      Math.round(Math.random() * (this.field.size.x - 20)) + 10,
      Math.round(Math.random() * (this.field.size.y - 20)) + 10,
      Math.round(Math.random() * 9) + 1,
      ['#38ff6c',
      '#57ffb8',
      '#61fdff',
      '#66bdff',
      '#6a8dff',
      '#9671ff',
      '#c670ff',
      '#ff67f0',
      '#ff4599',
      '#ff3c2f' ]
    );

    this.field.add(food);

  }



}
