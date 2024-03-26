import React from 'react';

import { Task, FilterType } from './TaskType.ts';
import NewTask from './NewTask.tsx';

type MyProps = {
  tasks: [Task[], Task[]];
  filter: FilterType;
  editID: number | null;
  setAsFinished: (id: number) => void;
  toggieEditMode: (id: number, input: string) => void;
  deleteScr: (id: number, isFinished: boolean) => void;
  editTaskContent: (id: number, text: string) => void;
};
type MyState = {
  time: number;
};

class TaskList extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { time: 0 };
    //Создаем обновление каждую секунду, чтобы обновлялись подписи к таскам
    setInterval((): void => {
      this.setState({ time: this.state.time === 0 ? this.state.time + 1 : 0 });
    }, 1000);
  }

  getTaskList(arr: Task[], finishedFlag: boolean): React.JSX.Element[] {
    let counter: number = arr.length - 1;
    return arr
      .slice()
      .reverse()
      .map((item: Task): React.JSX.Element => {
        item.id = counter--;
        return this.newTask(item, finishedFlag);
      });
  }

  newTask(item: Task, finishedFlag: boolean): React.JSX.Element {
    return (
      <li key={item.createTime} className="taskList_item">
        <NewTask
          isFinished={finishedFlag}
          id={item.id}
          string={item.name}
          setAsFinished={this.props.setAsFinished}
          toggieEditMode={this.props.toggieEditMode}
          deleteScr={this.props.deleteScr}
          editID={this.props.editID}
          createTime={item.createTime}
          editTaskContent={this.props.editTaskContent}
        />
      </li>
    );
  }

  render(): React.JSX.Element {
    let [tasks, filter] = [this.props.tasks, this.props.filter];
    let toDoData;
    switch (filter) {
      case 'ALL': {
        toDoData = this.getTaskList([...tasks[0]], false);
        toDoData = toDoData.concat(this.getTaskList([...tasks[1]], true));
        break;
      }
      case 'AVALIIABLE': {
        toDoData = this.getTaskList([...tasks[0]], false);
        break;
      }
      case 'FINISHED': {
        toDoData = this.getTaskList([...tasks[1]], true);
        break;
      }
      default: {
        break;
      }
    }
    return <ul className="taskList">{toDoData}</ul>;
  }
}

export default TaskList;
