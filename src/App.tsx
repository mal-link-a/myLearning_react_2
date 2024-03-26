/* eslint-disable no-unused-vars */
import React from 'react';

import Logo from './img/logo.svg';
import './App.css';
import TaskCreator from './TaskCreator.tsx';
import TaskList from './TaskList.tsx';
import TaskButtonPanel from './TaskButtonPanel.tsx';
import TaskInfoPanel from './TaskInfoPanel.tsx';
//import checkBoxOff from './img/check-off.svg';
//import checkBoxOn from './img/check-on.svg';
import { Task, FilterType } from './TaskType.ts';

interface MyState {
  time: Date;
  editID: number | null;
  filterType: FilterType;
  taskss: [Task[], Task[]];
}

class App extends React.Component {
  state: MyState = {
    time: new Date(),
    editID: null, //id редактируемого итема
    filterType: FilterType.ALL, // if типа предустановленных вариантов фильтрации тасков
    taskss: [
      [
        {
          name: 'Eat the meal mom left me',
          createTime: Date.now() - 1000000000,
          id: -1,
        },
        {
          name: 'Fill up the bird feeder',
          createTime: Date.now() - 10000000,
          id: -1,
        },
        {
          name: 'Feed my Tamaghost',
          createTime: Date.now() - 10000,
          id: -1,
        },
        {
          name: 'Say goodbye to Hiro',
          createTime: Date.now() - 100,
          id: -1,
        },
      ],
      [
        {
          name: 'Go out',
          createTime: Date.now() - 100000000000,
          id: -1,
        },
      ],
    ],
  };

  //Создание новой таски
  addNewClick = (text: string): void => {
    let Task: Task[] = [
      {
        name: text,
        createTime: Date.now(),
        endTime: Date.now(),
        id: -1,
      },
    ];
    let newData: [Task[], Task[]] = [...this.state.taskss];
    newData[0] = newData[0].concat(Task);
    this.setState({ taskss: newData });
  };

  //Редактирование названия таски
  editTaskContent = (id: number, text: string): void => {
    let newData: [Task[], Task[]] = [...this.state.taskss];
    newData[0][id].name = text;
    this.setState({ taskss: newData });
  };

  //Фильтруем таски по предустановленным категориям
  //Предустановленные категории зашиты в enum FilterType в TaskType.ts
  filterTaskList = (id: string): void => {
    this.setState({ filterType: id });
    return;
  };

  //Зачищаем все готовые таски и сбрасываем фильтр
  clearAllFinishedTasks = (): void => {
    let newData: [Task[], Task[]] = [this.state.taskss[0].slice(), []];
    this.setState({ taskss: newData, filterType: 'ALL' });
  };

  //Удаление одной таски по id (ивент кнопки)
  deleteTaskByID = (id: number, isFinished: boolean): void => {
    let newData = [...this.state.taskss];
    if (isFinished) {
      newData[1].splice(id, 1);
    } else {
      newData[0].splice(id, 1);
    }
    this.setState({ taskss: newData });
  };

  //Отметить таску по id как законченную (ивент кнопки)
  setTaskAsFinished = (id: number): void => {
    let newData: [Task[], Task[]] = [...this.state.taskss];
    let taskFinished: Task[] = newData[0].splice(id, 1);
    newData = [newData[0], newData[1].concat(taskFinished)];
    this.setState({ taskss: newData });
  };

  //Обработаем вход и выход из режима редактирования итема
  toggieEditMode = (id: number, input): void => {
    if (this.state.editID === id) {
      this.setState({ editID: null });
    } else {
      this.setState({ editID: id });
      input.focus();
    }
  };

  render(): React.JSX.Element {
    return (
      <>
        <div className="visual_black" />
        <div className="visual_gray" />
        <div className="main">
          <img className="logo" src={Logo} alt="" />
          <TaskCreator createCall={this.addNewClick} />
          <TaskButtonPanel
            filterType={this.state.filterType}
            filterCall={this.filterTaskList}
            clearFinishedCall={this.clearAllFinishedTasks}
          />
          <TaskInfoPanel
            doneTaskCount={this.state.taskss[1].length}
            taskCount={this.state.taskss[0].length + this.state.taskss[1].length}
          />
          <TaskList
            tasks={[...this.state.taskss]}
            filter={this.state.filterType}
            editID={this.state.editID}
            setAsFinished={this.setTaskAsFinished} //Проставить у таски флаг isFinished как true | ивент клика
            toggieEditMode={this.toggieEditMode} //Вход и выход из едит мода таски | ивент submit формы
            deleteScr={this.deleteTaskByID} //Удалить таску | ивент клика
            editTaskContent={this.editTaskContent} //Редактирование содержимого описания | ивент инпута onChange
          />
        </div>
      </>
    );
  }
}

export default App;
