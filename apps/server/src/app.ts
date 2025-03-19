import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import levelsRouter from './api/Levels/levels';

const app = express();
const port = 5000;

const whitelist = ['http://localhost:3000', 'http://localhost:8081'];
const corsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('', levelsRouter);

app.listen(port, () => {
  console.log(`Server is running`);

  // const data = [
  //   [8, 3, 2, 7, 5, 1, 0, 0, 6],
  //   [7, 4, 0, 0, 9, 0, 0, 1, 0],
  //   [0, 9, 0, 0, 8, 2, 7, 0, 3],
  //   [0, 0, 0, 1, 0, 0, 0, 4, 0],
  //   [0, 0, 0, 0, 4, 5, 0, 2, 0],
  //   [0, 0, 0, 0, 7, 0, 5, 3, 1],
  //   [3, 0, 0, 0, 0, 4, 9, 6, 0],
  //   [4, 0, 0, 3, 0, 0, 0, 8, 0],
  //   [0, 6, 1, 0, 0, 9, 3, 7, 4],
  // ];

  // const calculateComplexity = (matrix: number[][]) => {
  //   const newMatrix: number[][] = Utils.copyDeep(matrix);
  //   const cache: {[key: number]: {[key: number]: number[]}} = {};
  //   let complexity: number = 0;

  //   const iterate = () => {
  //     let changedCellsCount: number = 0;
  //     newMatrix.forEach((row: number[], x: number) => {
  //       row.forEach((number: number, y: number) => {
  //         if (number === 0) {
  //           if (!cache[x]) {
  //             cache[x] = {};
  //           }
  //           if (!cache[x][y]) {
  //             cache[x][y] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //           }
  //           const rowIntersectingValues: number[] =
  //             GameUtils.getRowIntersectingValues(newMatrix, x);
  //           const columnIntersectingValues: number[] =
  //             GameUtils.getColumnIntersectingValues(newMatrix, y);
  //           const groupIntersectingValues: number[] =
  //             GameUtils.getGroupIntersectingValues(newMatrix, {x, y});
  //           const valueSet: number[] = [
  //             ...new Set([
  //               ...rowIntersectingValues,
  //               ...columnIntersectingValues,
  //               ...groupIntersectingValues,
  //             ]),
  //           ].filter((value) => value !== 0);

  //           valueSet.forEach((value: number) => {
  //             cache[x][y] = cache[x][y].filter((number) => number !== value);
  //           });

  //           if (cache[x][y].length === 1) {
  //             complexity += 5;
  //             changedCellsCount++;
  //             newMatrix[x][y] = cache[x][y][0];
  //             delete cache[x][y];

  //             if (!Object.keys(cache[x]).length) {
  //               delete cache[x];
  //             }
  //           }
  //         }
  //       });
  //     });

  //     complexity++;
  //     return changedCellsCount;
  //   };

  //   const fillCells = () => {
  //     let changedCooridnates: ICoordinate[] = [];
  //     newMatrix.forEach((row: number[], x: number) => {
  //       row.forEach((number: number, y: number) => {
  //         if (number === 0 && !!cache[x]?.[y]) {
  //           const rowIntersections: ICoordinate[] =
  //             GameUtils.getRowIntersections(x);
  //           const columnIntersections: ICoordinate[] =
  //             GameUtils.getColumnIntersections(y);
  //           const groupIntersections: ICoordinate[] =
  //             GameUtils.getGroupIntersections({x, y});

  //           const possibleValues: number[] = cache[x][y];

  //           for (const possibleValue of possibleValues) {
  //             // complexity++;
  //             const isOnlyPossibleValueInRow: boolean = !rowIntersections.some(
  //               ({x: currentX, y: currentY}: ICoordinate) =>
  //                 (x !== currentX || y !== currentY) &&
  //                 cache[currentX]?.[currentY]?.includes(possibleValue)
  //             );
  //             const isOnlyPossibleValueInColumn: boolean =
  //               !columnIntersections.some(
  //                 ({x: currentX, y: currentY}: ICoordinate) =>
  //                   (x !== currentX || y !== currentY) &&
  //                   cache[currentX]?.[currentY]?.includes(possibleValue)
  //               );
  //             const isOnlyPossibleValueInGroup: boolean =
  //               !groupIntersections.some(
  //                 ({x: currentX, y: currentY}: ICoordinate) =>
  //                   (x !== currentX || y !== currentY) &&
  //                   cache[currentX]?.[currentY]?.includes(possibleValue)
  //               );

  //             const isOnlyPossibleValue: boolean =
  //               isOnlyPossibleValueInRow ||
  //               isOnlyPossibleValueInColumn ||
  //               isOnlyPossibleValueInGroup;

  //             if (isOnlyPossibleValue) {
  //               newMatrix[x][y] = possibleValue;
  //               changedCooridnates.push({x, y});
  //               complexity += 15;
  //               break;
  //             }
  //           }
  //         }
  //       });
  //     });

  //     changedCooridnates.forEach(({x, y}: ICoordinate) => {
  //       delete cache[x][y];

  //       if (!Object.keys(cache[x]).length) {
  //         delete cache[x];
  //       }
  //     });

  //     complexity += 2;
  //   };

  //   let solution = GameUtils.checkSolution(newMatrix);

  //   while (!solution) {
  //     let changedCellsCount = iterate();
  //     while (changedCellsCount && !GameUtils.checkSolution(newMatrix)) {
  //       changedCellsCount = iterate();
  //     }
  //     if (GameUtils.checkSolution(newMatrix)) {
  //       break;
  //     }
  //     fillCells();
  //     solution = GameUtils.checkSolution(newMatrix);
  //   }

  //   return {complexity, newMatrix};
  // };

  // console.log(calculateComplexity(data));
});

export {app};
