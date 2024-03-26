import React from 'react';

//Форма для создания новых задач toDo
type MyProps = {
  createCall: (text: string) => void;
};

class TaskCreator extends React.Component<MyProps> {
  state = { val: '' }; //Обработка input
  handleChangeValue = (e) => {
    this.setState({ val: e.target.value });
  }; //Обработка sumbit - создание новой таски
  handleSumbit = (e): void => {
    e.preventDefault();
    if (this.state.val !== '') {
      this.props.createCall(this.state.val);
      this.setState({ val: '' });
    }
    e.target.textBox.focus();
  };
  render(): React.JSX.Element {
    return (
      <form onSubmit={this.handleSumbit}>
        <div className="taskCreator">
          <input
            name="textBox"
            className="taskCreator__textbox"
            type="text"
            placeholder="Добавить новую задачу..."
            onChange={this.handleChangeValue}
            value={this.state.val}
          />
          <button type="submit" className="taskCreator__submitBtn">
            <p>Добавить</p>
            <div className="visual_plusInCircle">+</div>
          </button>
        </div>
      </form>
    );
  }
}

export default TaskCreator;
