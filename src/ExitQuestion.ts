import {Question} from "./Question";

export class ExitQuestion extends Question {
  private exit: boolean

  constructor() {
    super("Salir");
    this.exit = false
  }

  isClosed(): boolean {
    return this.exit
  }

  execute(): void {
    this.exit = true
  }

}
