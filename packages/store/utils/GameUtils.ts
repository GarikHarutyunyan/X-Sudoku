import {ICoordinate} from '../data-structures';

export class GameUtils {
  static checkSolution = (matrix: number[][]): boolean => {
    const BOARD_SIZE = 9;

    for (let i = 0; i < BOARD_SIZE; i++) {
      const rowValues = new Array(BOARD_SIZE).fill(false);
      const colValues = new Array(BOARD_SIZE).fill(false);
      const boxValues = new Array(BOARD_SIZE).fill(false);
      for (let j = 0; j < BOARD_SIZE; j++) {
        const rowValue = matrix[i][j];
        const colValue = matrix[j][i];
        const boxValue =
          matrix[3 * Math.floor(i / 3) + Math.floor(j / 3)][
            3 * (i % 3) + (j % 3)
          ];
        if (rowValue !== 0) {
          if (rowValues[rowValue - 1]) {
            return false;
          }
          rowValues[rowValue - 1] = true;
        }
        if (colValue !== 0) {
          if (colValues[colValue - 1]) {
            return false;
          }
          colValues[colValue - 1] = true;
        }
        if (boxValue !== 0) {
          if (boxValues[boxValue - 1]) {
            return false;
          }
          boxValues[boxValue - 1] = true;
        }
      }
    }

    return true;
  };

  static getRowIntersections = (x: number) => {
    const rowIntersections: ICoordinate[] = [];

    for (let i = 0; i < 9; i++) {
      rowIntersections.push({x, y: i});
    }

    return rowIntersections;
  };

  static getColumnIntersections = (y: number) => {
    const columnIntersections: ICoordinate[] = [];

    for (let i = 0; i < 9; i++) {
      columnIntersections.push({x: i, y});
    }

    return columnIntersections;
  };

  static getGroupIntersections = ({x, y}: ICoordinate) => {
    const groupIntersections: ICoordinate[] = [];
    const baseX: number = 3 * Math.floor(x / 3);
    const baseY: number = 3 * Math.floor(y / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        groupIntersections.push({x: baseX + i, y: baseY + j});
      }
    }

    return groupIntersections;
  };
}
