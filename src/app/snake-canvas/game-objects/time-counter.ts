export class TimeCounter {

  lastActionTimeMillis: number = 0; // in miliseconds
  actionPeriodMillis: number = 0; // in miliseconds
  checkingMoment: number = 0;

  constructor (lastActionTimeMillis: number, actionPeriodMillis: number) {
    this.lastActionTimeMillis = lastActionTimeMillis;
    this.actionPeriodMillis = actionPeriodMillis;
  }

  public isItTime(): boolean {
    this.checkingMoment = new Date().getTime();
    return (this.lastActionTimeMillis + this.actionPeriodMillis) < this.checkingMoment;
  }

  public fixLastChecking() {
    this.lastActionTimeMillis = this.checkingMoment;
  }

}
