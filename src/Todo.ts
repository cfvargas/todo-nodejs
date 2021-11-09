import {Menu} from "./Menu";
import {AddTodoQuestion} from "./AddTodoQuestion";
import {GetAllTodosQuestion} from "./GetAllTodosQuestion";
import {FilterTodoByPriorityQuestion} from "./FilterTodoByPriorityQuestion";
import {DeleteTodoQuestion} from "./DeleteTodoQuestion";
import {TodoRepository} from "./TodoRepository";
import {TodoInMemoryRepository} from "./TodoInMemoryRepository";

export class Todo {
  private tasks: TodoRepository
  private menu: Menu

  constructor() {
    this.tasks = new TodoInMemoryRepository()
    this.menu = new Menu()

    this.menu.add(new AddTodoQuestion(this.tasks))
    this.menu.add(new GetAllTodosQuestion(this.tasks))
    this.menu.add(new FilterTodoByPriorityQuestion(this.tasks))
    this.menu.add(new DeleteTodoQuestion(this.tasks))
    this.menu.end()
  }

  async execute() {
    do {
      this.menu.show()
      const question = await this.menu.getQuestion()
      await question.execute()
    } while (!this.menu.isFinished())
  }
}
