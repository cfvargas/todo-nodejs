import inquirer from 'inquirer'
import { Question } from './Question'
import {ExitQuestion} from "./ExitQuestion";

interface Answer {
  option: number
}

export class Menu {
  private questions: Question[]
  private exit: ExitQuestion

  constructor() {
    this.questions = []
    this.exit = new ExitQuestion()
  }

  add(question: Question): void {
    this.questions.push(question)
  }

  show(): void {
    for (let i = 0; i < this.questions.length ; i++) {
      this.questions[i].show(i + 1)
    }
  }

  async getQuestion(): Promise<Question> {
    let answer: Answer
    do {
      answer = await inquirer.prompt([{
      type: "input",
      name: "option",
      message: `Seleccione una opción [1 - ${this.questions.length}] `
    }])

    } while (answer.option < 1 || answer.option > this.questions.length)
    return this.questions[answer.option - 1]
  }

  end(): void{
    this.add(this.exit)
  }

  isFinished(): boolean {
    return this.exit.isClosed()
  }
}

