/* eslint-disable no-unused-vars */
export type Task = {
  name: string;
  createTime: number;
  id: number;
  endTime?: number;
};
export enum FilterType {
  ALL = 'ALL',
  AVALIIABLE = 'AVALIIABLE',
  FINISHED = 'FINISHED',
}
