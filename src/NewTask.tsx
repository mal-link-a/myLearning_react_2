import React from 'react';

import checkBoxOff from './img/check-off.svg';
import checkBoxOn from './img/check-on.svg';
import TaskDescription from './TaskDescription.tsx';

type MyProps = {
  isFinished: boolean;
  id: number;
  string: string;
  setAsFinished: (id: number) => void;
  toggieEditMode: (id: number, input: string) => void;
  deleteScr: (id: number, isFinished: boolean) => void;
  editID: number | null;
  createTime: number;
  editTaskContent: (id: number, text: string) => void;
};

class NewTask extends React.Component<MyProps> {
  handleSetTaskAsFinished = (): void => {
    if (!this.props.isFinished) {
      this.props.setAsFinished(this.props.id);
    }
  };
  handleToggieEditMode = (e): void => {
    e.preventDefault();
    return this.props.toggieEditMode(this.props.id, e.target.description);
  };
  handleDeleteTask = (e): void => {
    e.preventDefault();
    return this.props.deleteScr(this.props.id, this.props.isFinished);
  };

  render(): React.JSX.Element {
    let [isFinished, editID, id, createTime, string] = [
      this.props.isFinished,
      this.props.editID,
      this.props.id,
      this.props.createTime,
      this.props.string,
    ];
    return (
      <form className={` id${this.props.id} task ${isFinished ? 'finished' : ''}`} onSubmit={this.handleToggieEditMode}>
        <label className="task__finisher">
          <button type="button" className="task__finisher_btn" onClick={this.handleSetTaskAsFinished}>
            <img src={isFinished ? checkBoxOn : checkBoxOff} alt="" className="task__finisher_img" />
          </button>
        </label>
        <TaskDescription
          id={id}
          editID={editID}
          description={string}
          titleCreateTime={createTime}
          editTaskContent={this.props.editTaskContent}
          toggieEditMode={this.handleToggieEditMode}
        />
        <button type="submit" className={`task__button task__button_edit ${editID === id ? 'button_white' : ''}`}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <defs>
                <clipPath id="a">
                  <path fill="#fff" fillOpacity="0" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
              <path fill="none" d="M0 0h24v24H0z" />
              <g clipPath="url(#a)">
                <path
                  fill="gray"
                  fillRule="evenodd"
                  d="m8.276 14.794 6.761-7.11-.942-.991-6.762 7.11v.99h.943Zm.553 1.402H6V13.22l7.623-8.016A.65.65 0 0 1 14.095 5a.65.65 0 0 1 .47.205l1.887 1.983a.72.72 0 0 1 .195.496.72.72 0 0 1-.195.496l-7.623 8.016ZM6 17.598h12V19H6v-1.402Z"
                />
              </g>
            </svg>
          </div>
        </button>
        <button type="button" className="task__button" onClick={this.handleDeleteTask}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <defs>
                <clipPath id="a">
                  <rect width="24" height="24" fill="#fff" fillOpacity="0" rx="4" />
                </clipPath>
              </defs>
              <rect width="24" height="24" fill="none" rx="4" />
              <g fill="gray" clipPath="url(#a)">
                <path
                  fillRule="evenodd"
                  d="M12.872 9.985h1.33v5.522h-1.33V9.985ZM10.132 9.985h1.33v5.522h-1.33V9.985Z"
                />
                <path d="M18 7.167a.659.659 0 0 0-.126-.377.62.62 0 0 0-.316-.228.576.576 0 0 0-.177-.045h-3.412a2.144 2.144 0 0 0-.745-1.097A2.01 2.01 0 0 0 11.998 5a2.01 2.01 0 0 0-1.227.42 2.145 2.145 0 0 0-.745 1.097H6.614a.593.593 0 0 0-.165.027h-.015a.62.62 0 0 0-.327.251.66.66 0 0 0 .056.796.61.61 0 0 0 .358.2l.684 9.742c.01.38.158.741.412 1.013.255.271.6.434.964.454h6.83c.366-.02.71-.181.966-.453.255-.272.403-.634.413-1.014l.68-9.734a.607.607 0 0 0 .38-.213.652.652 0 0 0 .15-.419Zm-6.002-.952c.124 0 .247.026.362.079a.904.904 0 0 1 .3.223h-1.325a.898.898 0 0 1 .3-.224.866.866 0 0 1 .363-.078Zm3.414 11.575H8.58c-.079 0-.201-.133-.216-.344L7.691 7.81h8.613l-.674 9.635c-.015.211-.137.344-.218.344Z" />
              </g>
            </svg>
          </div>
        </button>
      </form>
    );
  }
}

export default NewTask;
