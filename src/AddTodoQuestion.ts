import inquirer from "inquirer";
import {Question} from "./Question";
import {Priority, Task} from "./Task"
import {TodoRepository} from "./TodoRepository";

interface Answer {
  title: string
  description: string
  priority: Priority
}

export class AddTodoQuestion extends Question {
  tasks: TodoRepository

  constructor(tasks: TodoRepository) {
    super("Agregar una tarea");
    this.tasks = tasks
  }

  async execute() {
    const answer: Answer = await inquirer.prompt([
      { type: "input", name: "title", message: "Titulo de la tarea: " },
      { type: "input", name: "description", message: "Descripción de la tarea: "},
      { type: "list", name: "priority", message: "Prioridad de la tarea: ", choices: Task.getPriorities()}
    ])

    this.tasks.add(new Task(answer.title, answer.description, answer.priority))

    console.log("\n Tarea creada exitosamente \n")
  }
}
