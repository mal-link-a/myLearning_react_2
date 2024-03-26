import React from 'react';

type MyProps = {
  filterType: string;
  filterCall: (id: string) => void;
  clearFinishedCall: () => void;
};

class TaskButtonPanel extends React.Component<MyProps> {
  handleFilterList = (id: string): (() => void) => {
    let funcFilter: (id: string) => void = this.props.filterCall;
    return function (): void {
      funcFilter(id);
    };
  };

  handleClearFinished = (): void => {
    this.props.clearFinishedCall();
  };

  render(): React.JSX.Element {
    let data: string = this.props.filterType;
    return (
      <div>
        <button type="button" className="buttonStyle" onClick={this.handleFilterList('ALL')}>
          Все задачи
        </button>
        <button type="button" className="buttonStyle" onClick={this.handleFilterList('AVALIIABLE')}>
          В процессе
        </button>
        <button type="button" className="buttonStyle" onClick={this.handleFilterList('FINISHED')}>
          Завершённые
        </button>
        <button
          type="button"
          className={`buttonStyle ${data === 'FINISHED' ? '' : 'hidden'}`}
          onClick={this.handleClearFinished}
        >
          Очистить
        </button>
      </div>
    );
  }
}

export default TaskButtonPanel;
