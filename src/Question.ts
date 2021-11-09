export abstract class Question {
  protected title: string

  protected constructor(title: string) {
    this.title = title
  }

  show(position: number) {
    console.log(`${position}. ${this.title}`)
  }

  abstract execute(): void

}
