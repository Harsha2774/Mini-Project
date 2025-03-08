import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  text: string;
  priority: 'Low' | 'Medium' | 'High';
  deadline: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-container">
      <h1>To-Do List</h1>

      <!-- Task Input -->
      <input [(ngModel)]="newTask.text" type="text" placeholder="Enter a task" />
      <select [(ngModel)]="newTask.priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input [(ngModel)]="newTask.deadline" type="date" />
      <button (click)="addTask()" [disabled]="!newTask.text.trim()">Add Task</button>

      <!-- Display Tasks -->
      <ul>
        <li *ngFor="let task of tasks">
          <div *ngIf="!task.isEditing">
            <span [ngClass]="getPriorityClass(task.priority)">
              {{ task.text }} ({{ task.priority }}) - Due: {{ task.deadline }}
            </span>
            <button (click)="editTask(task)">Edit</button>
            <button (click)="removeTask(task)">Remove</button>
          </div>

          <div *ngIf="task.isEditing">
            <input [(ngModel)]="task.text" type="text" />
            <select [(ngModel)]="task.priority">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input [(ngModel)]="task.deadline" type="date" />
            <button (click)="saveTask(task)">Save</button>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .todo-container {
      max-width: 450px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
      background-color: #f9f9f9;
    }
    input, select {
      margin: 5px;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    button {
      padding: 8px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #0056b3;
    }
    ul {
      list-style: none;
      padding: 0;
      margin-top: 10px;
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
      margin-bottom: 5px;
    }
    .Low {
      color: green;
    }
    .Medium {
      color: orange;
    }
    .High {
      color: red;
      font-weight: bold;
    }
  `]
})
export class TodoComponent implements OnInit {
  newTask: Task = { text: '', priority: 'Medium', deadline: '' };
  tasks: Task[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  addTask() {
    if (this.newTask.text.trim()) {
      this.tasks.push({ ...this.newTask });
      this.newTask = { text: '', priority: 'Medium', deadline: '' };
      this.saveTasks();
    }
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.saveTasks();
  }

  editTask(task: Task) {
    task.isEditing = true;
  }

  saveTask(task: Task) {
    task.isEditing = false;
    this.saveTasks();
  }

  saveTasks() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  loadTasks() {
    if (typeof window !== 'undefined' && localStorage) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    }
  }

  getPriorityClass(priority: string) {
    return priority;
  }
}


