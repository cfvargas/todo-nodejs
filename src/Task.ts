export type Priority = "High" | "Medium" | "Low"

type ID = number

export class Task {
  private readonly id: ID
  private title: string
  private description: string
  private priority: Priority
  private createdAt: Date

  constructor(title: string, description: string, priority: Priority) {
    this.id = Date.now()
    this.title = title
    this.description = description
    this.priority = priority
    this.createdAt = new Date()
  }

  getPriority(): Priority {
    return this.priority
  }

  getState() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      createdAt: this.createdAt
    }
  }

  static getPriorities(): Priority[] {
    return ["High", "Medium", "Low"]
  }
}
