import React from 'react';

type MyProps = {
  doneTaskCount: number;
  taskCount: number;
};

class TaskInfoPanel extends React.Component<MyProps> {
  render(): React.JSX.Element {
    return (
      <div className="listInfo">
        <div>
          Всего задач:
          <span className="listInfo__data">{this.props.taskCount}</span>
        </div>
        <div>
          Завершено:
          <span className="listInfo__data">{this.props.doneTaskCount + ' из ' + this.props.taskCount}</span>
        </div>
      </div>
    );
  }
}

export default TaskInfoPanel;
