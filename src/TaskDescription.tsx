import React from 'react';

type MyProps = {
  id: number | undefined;
  editID: number | null;
  description: string;
  titleCreateTime: number;
  editTaskContent: (id: number, value: any) => void;
  toggieEditMode: (input: any) => void;
};

class TaskDescription extends React.Component<MyProps> {
  changeHandler = (e): void => {
    e.preventDefault();
    if (this.props.id === this.props.editID) {
      this.props.editTaskContent(this.props.id, e.target.value);
    }
  };
  editHandler = (e): void => {
    if (this.props.id === this.props.editID) {
      this.props.toggieEditMode(e);
    }
  };

  render(): React.JSX.Element {
    let [description, titleCreateTime, isEditing] = [
      this.props.description,
      this.props.titleCreateTime,
      this.props.id === this.props.editID,
    ];
    return (
      <input
        name="description"
        type="text"
        className={`task__name ${isEditing ? 'task__name_editMode' : ''}`}
        onChange={this.changeHandler}
        onBlur={this.editHandler}
        value={description}
        title={isEditing ? '' : getTitleCreateTime(titleCreateTime)}
      />
    );
  }
}

function getTitleCreateTime(createTime: number): string {
  let time: number = Math.floor((Date.now() - createTime) / 1000);
  //Дни
  if (time > 86400) {
    let days: string;
    let floorTime = Math.floor(time / 86400);
    if (floorTime === 1) {
      days = 'день';
    } else if (floorTime < 5) {
      days = 'дня';
    } else {
      days = 'дней';
    }
    return `Создана ${floorTime} ${days} назад`;
  }
  //Часы
  if (time > 3600) {
    let hour: string;
    let floorTime = Math.floor(time / 3600);
    if (floorTime === 1) {
      return 'Создана час назад';
    } else if (floorTime < 5) {
      hour = 'часа';
    } else {
      hour = 'часов';
    }
    return `Создана ${floorTime} ${hour} назад`;
  }
  //Минуты
  if (time > 60) {
    let min: string;
    let floorTime = Math.floor(time / 60);
    if (floorTime === 1) {
      min = 'минуту';
    } else if (floorTime < 5) {
      min = 'минуты';
    } else {
      min = 'минут';
    }
    return `Создана ${floorTime} ${min} назад`;
  }
  //Секунды
  let sek: string;
  if (time === 0) {
    return 'Создана сейчас';
  } else if (time === 1) {
    sek = 'секунду';
  } else if (time < 5) {
    sek = 'секунды';
  } else {
    sek = 'секунд';
  }
  return `Создана ${time} ${sek} назад`;
}

export default TaskDescription;
