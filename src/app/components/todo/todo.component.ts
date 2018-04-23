import { Component, OnInit } from '@angular/core';
import { TodoStoreService } from '../../services/todo-store.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  subscription: any;
  todos: any;
  constructor(private todoStore:TodoStoreService) { }

  ngOnInit() {
    this.subscription = this.todoStore.getTodos().subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    })
  }

  ngOnDestroy() {
    this.subscription.unSubscribe();
  }

  addTodo(toto) {
    console.log('sd', toto);
    this.todoStore.dispatch({
      type: 'TODO_ADD',
      payload: toto 
    })
  }

  todoItemChange(evt, todoItem) {
    console.log(evt.target);
    this.todoStore.dispatch({
      type: 'TODO_STATE_CHANGED',
      payload: todoItem 
    })
  }

}
