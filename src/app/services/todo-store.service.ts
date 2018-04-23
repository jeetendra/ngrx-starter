import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { map } from "rxjs/operators";
enum Filter {
  ALL,
  ACTIVE,
  COMPLETED
}
type ITodos = {
  text: string;
  completed: boolean;
};

interface ITodoStore {
  filter: Filter;
  todos: ITodos[];
}

@Injectable()
export class TodoStoreService {
  private stateSubject$: BehaviorSubject<ITodoStore> = new BehaviorSubject({
    filter: Filter.ALL,
    todos: []
  });

  public readonly state$ = this.stateSubject$.asObservable();

  constructor() {
    this.addNewTodo("start adding todos");
  }

  addNewTodo(todotext: string) {
    let todoItem:ITodos = {
      text: todotext,
      completed: false
    }
    let allTodoItem:ITodos[] = this.stateSubject$.getValue().todos;
    let newState: ITodoStore = Object.assign(
      {},
      this.stateSubject$.getValue(),
      { todos: [...allTodoItem, todoItem] }
    );
    this.stateSubject$.next(newState);
  }

  updateTodo(payload:ITodos) {
    let allTodoItem:ITodos[] = this.stateSubject$.getValue().todos.filter(
      (todo:ITodos) => todo.text != payload.text
    );

    let newState: ITodoStore = Object.assign(
      {},
      this.stateSubject$.getValue(),
      { todos: [...allTodoItem, payload] }
    );
    this.stateSubject$.next(newState);
  }

  filterTodoByType(todo, filterType) {
    if (filterType === Filter.ALL) {
      return true;
    } else if (filterType === Filter.COMPLETED) {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  }

  dispatch({type, payload}) {
    if(type == 'TODO_STATE_CHANGED') {
      this.updateTodo(payload)
    } else if(type == 'TODO_ADD') {
      this.addNewTodo(payload)
    }
  }

  getTodos() {
    return this.state$.pipe(
      map( ({ filter, todos }) => todos.filter( todo => this.filterTodoByType(todo, filter) ) )
    )
  }
}
