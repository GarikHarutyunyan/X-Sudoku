import {ICoordinate} from '../data-structures';

export class MatrixUtils {
  static getFilledCoordinates = (matrix: number[][]): ICoordinate[] => {
    const filledCoordinates: ICoordinate[] =
      matrix.reduce(
        (matrixCoordinates: ICoordinate[], row: number[], x: number) => {
          const coordinates: ICoordinate[] = row.reduce(
            (rowCoordinates: ICoordinate[], cell: number, y: number) => {
              if (cell) {
                return [...rowCoordinates, {x, y}];
              }
              return rowCoordinates;
            },
            []
          );

          return [...matrixCoordinates, ...coordinates];
        },
        []
      ) || [];

    return filledCoordinates;
  };
}
