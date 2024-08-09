export interface DataToCreateColumnDTO {
  name: string;
  teamId: string;
  statusCode: string;
}

export interface MoveTaskToTheSameColDTO {
  columnId: string;
  taskCurrentIndex: number;
  taskNewIndex: number;
}

export interface MoveTaskToDiffColumnDTO {
  taskCurrentIndex: number;
  taskNewIndex: number;
  columnIdFrom: string;
  columnIdTo: string;
}

export interface ITaskToCreate {
  title: string;
  description: string;
  dateExpire: Date;
  priority: string;
  type: string;
  lstPersonInCharge: string[];
  fileLink: string;
  sourceCodeLink: string;
}

export interface SwapBetweenColDTO {
  colCurrentIndex: number;
  colTargetIndex: number;
}

export interface LoadAllColOfTeamDTO {
  teamId: string;
  lstPersonInCharge?: string[];
  searchKey?: string;
  status?: string;
}
