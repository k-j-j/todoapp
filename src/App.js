import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component {

  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [
      { id: 0, text: ' 리액트', checked: true },
      { id: 1, text: 'JSX', checked: false },
      { id: 2, text: '컴포넌트', checked: false },
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  /*
  concat 은 두 개의 문자열을 하나의 문자열로 만들어주는 역활을 하는 함수이며,
  입력값을 문자열 대신 배열을 사용하면 두 개의 배열을 하나의 배열로 만들어주는 역활도 하는 함수
  */
  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '', // 인풋 비우고
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    //arr.findIndex(callback( element[, index[, array]] )[, thisArg])
    /*
  findIndex() 함수는 
배열에서 값을 찾는 조건을 callback 함수로 전달하고,
배열에서 조건에 맞는 값의 '첫번째 index'를 리턴하는 함수입니다.

callback(element, index, array) 함수
조건을 비교할 callback 함수이고, 다음 3개의 파라미터가 전달됩니다.
callback 함수에서 사용자가 테스트할 조건을 정의하고,
만약 배열의 값이 조건에 부합하면 true를 리턴하면,
해당 배열의 index가 findIndex()의 리턴값이 됨.
조건에 부합하는 값을 찾으면, 그 이후의 배열값은 테스트 되지 않습니다.

element : 현재 처리중인 배열의 element
index : 현재 처리중인 배열의 index입니다. (optional)
array : findIndex가 호출된 배열입니다. (optional)
    */ 
    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사
    
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
