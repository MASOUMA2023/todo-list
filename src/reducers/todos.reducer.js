export const actions={
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    setLoadError: 'setLoadError',
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    revertTodo: 'revertTodo',
    clearError: 'clearError',
    setSortField: 'setSortField',
    setSortDirection:'setSortDiirection',
    setQueryString:'setQueryString',

}

export const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: '',
    sortDirection:'desc',
    sortField:'created Time',
    queryString:'',
  }

  export function todosReducer(state= initialState,action) {
    switch (action.type) {
      case actions.fetchTodos:
        return { ...state, isLoading: true, errorMessage: '' };
  
      case actions.loadTodos:
        return { ...state, todoList: action.payload.map((record) => ({
            id: record.id,
            title: record.title || 'Untitled Todo',
            isCompleted: typeof record.isCompleted === 'boolean' ? record.isCompleted : false,
          })),
          isLoading: false,
     };
  
      case actions.setLoadError:
        return { ...state, isLoading: false,isSaving: false, errorMessage: action.payload, };
  
      case actions.startRequest:
        return { ...state, isSaving: true };
  
      case actions.addTodo:{
  const newTodo = {
    id: action.payload.id,
    title: action.payload.title || 'Untitled Todo',
    isCompleted:
      typeof action.payload.isCompleted === 'boolean'
        ? action.payload.isCompleted: false,}
          return {
            ...state,
            todoList: [...state.todoList , newTodo],
            isSaving: false,}
          }
      case actions.endRequest:
        return { ...state, isSaving: false , isLoading: false,};
  
      case actions.updateTodo:
      case actions.completeTodo:
        return {
          ...state,
          todoList: state.todoList.map((todo) =>
            todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
          ),
        };
  
      case actions.revertTodo:
        return { ...state, todoList: state.todoList.map((todo) =>
            todo.id === action.payload.id ? { ...todo, ...action.payload } : todo)};
  
      case actions.clearError:
        return { ...state, errorMessage: '' };
  
case actions.setSortField:
    return { ...state, sortField:action.payload}

    case actions.setSortDirection:
        return{...state, sortDirection: action.payload}

        case actions.setQueryString:
            return{ ...state, queryString: action.payload}
            
      default:
        return state;
    }
  }
  