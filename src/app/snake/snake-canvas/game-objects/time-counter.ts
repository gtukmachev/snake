export class TimeCounter {

  lastActionTimeMillis: number = 0; // in miliseconds
  actionPeriodMillis: number = 0; // in miliseconds
  lastCheckingMoment: number = 0;

  constructor (actionPeriodMillis: number) {
    this.lastActionTimeMillis = 0;
    this.actionPeriodMillis = actionPeriodMillis;
  }

  public isItTime(): boolean {
    this.lastCheckingMoment = new Date().getTime();
    return (this.lastActionTimeMillis + this.actionPeriodMillis) < this.lastCheckingMoment;
  }

  public fixLastChecking() {
    this.lastActionTimeMillis = this.lastCheckingMoment;
  }

}
