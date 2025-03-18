import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {LevelClient} from '../clients/LevelClient';
import {ICoordinate, ILevel, RequestStatus} from '../data-structures';
import {GameUtils, MatrixUtils} from '../utils';
import {RootState} from './store';

const levelsAdapter = createEntityAdapter<ILevel>();

export interface ILevelState {
  level: {
    entity: ILevel | null;
    status: RequestStatus;
    isSolved: boolean;
    activeCoordinate: ICoordinate | null;
    intersections: ICoordinate[];
    immutabilityMatrix: Array<Array<boolean | undefined>>;
    errorMatrix: Array<Array<number>>;
    emptyCoordinatesCount: number;
  };
  levels: {
    ids: string[];
    entities: Record<string, ILevel>;
    status: RequestStatus;
  };
}

const initialState: ILevelState = {
  level: {
    entity: null,
    status: RequestStatus.IDLE,
    isSolved: false,
    activeCoordinate: null,
    intersections: [],
    immutabilityMatrix: [[]],
    errorMatrix: Array(9).fill(Array(9).fill(0)),
    emptyCoordinatesCount: 81,
  },
  levels: {ids: [], entities: {}, status: RequestStatus.IDLE},
};

export const getLevels = createAsyncThunk<ILevel[]>(
  'levels/getAll',
  async () => {
    const levels: ILevel[] = await LevelClient.getAll();

    return levels;
  }
);

export const getLevel = createAsyncThunk<ILevel, string>(
  'levels/get',
  async (id) => {
    const level: ILevel = await LevelClient.get(id);

    return level;
  }
);

const includesCoordinate = (
  coordinates: ICoordinate[],
  coordinate: ICoordinate
) => {
  return coordinates.some(
    (c: ICoordinate) => c.x === coordinate.x && c.y === coordinate.y
  );
};

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    resetLevel: (state) => {
      state.level.isSolved = false;
      state.level.intersections = [];
      state.level.immutabilityMatrix = [[]];
      state.level.errorMatrix = Array(9).fill(Array(9).fill(0));
    },
    changeActiveCoordinate: (state: ILevelState, action) => {
      const coordinate: ICoordinate = action.payload;
      const rowIntersections: ICoordinate[] = GameUtils.getRowIntersections(
        coordinate.x
      );
      const columnIntersections: ICoordinate[] =
        GameUtils.getColumnIntersections(coordinate.y);

      const groupIntersections: ICoordinate[] =
        GameUtils.getGroupIntersections(coordinate);

      state.level.intersections = [
        ...rowIntersections,
        ...columnIntersections,
        ...groupIntersections,
      ];
      state.level.activeCoordinate = coordinate;
    },
    changeActiveCoordinateValue: (
      state: ILevelState,
      action: PayloadAction<number>
    ) => {
      const coordinate: ICoordinate | null = state.level.activeCoordinate;
      const level: ILevel | null = state.level.entity;
      const newValue: number = action.payload;

      if (level && coordinate) {
        const oldValue: number = level.matrix[coordinate.x][coordinate.y];
        const oldValueWasEmpty: boolean = oldValue === 0;
        const newValueIsEmpty: boolean = newValue === 0;

        level.matrix[coordinate.x][coordinate.y] = newValue;

        if (oldValueWasEmpty && !newValueIsEmpty) {
          state.level.emptyCoordinatesCount--;
        } else if (!oldValueWasEmpty && newValueIsEmpty) {
          state.level.emptyCoordinatesCount++;
        }

        const intersections: ICoordinate[] = state.level.intersections;
        let worngIntersactionsCount: number = 0;

        intersections.forEach(({x, y}: ICoordinate) => {
          if (x !== coordinate.x || y !== coordinate.y) {
            if (level.matrix[x][y] === newValue && newValue) {
              state.level.errorMatrix[x][y]++;
              worngIntersactionsCount++;
            } else if (level.matrix[x][y] === oldValue && oldValue) {
              state.level.errorMatrix[x][y]--;
            }
          }
        });

        state.level.errorMatrix[coordinate.x][coordinate.y] =
          worngIntersactionsCount;

        const allCoordinatesAreFilled: boolean =
          state.level.emptyCoordinatesCount === 0;

        if (allCoordinatesAreFilled) {
          const gameIsSolved: boolean = GameUtils.checkSolution(level.matrix);

          if (gameIsSolved) {
            state.level.isSolved = true;
            state.level.activeCoordinate = null;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLevels.pending, (state) => {
        state.levels.status = RequestStatus.LOADING;
      })
      .addCase(getLevels.fulfilled, (state, action) => {
        state.levels.status = RequestStatus.SUCCEEDED;
        levelsAdapter.setAll(state.levels, action.payload);
      })
      .addCase(getLevels.rejected, (state) => {
        state.levels.status = RequestStatus.FAILED;
      });

    builder
      .addCase(getLevel.pending, (state) => {
        state.level.status = RequestStatus.LOADING;
      })
      .addCase(getLevel.fulfilled, (state, action) => {
        state.level.status = RequestStatus.SUCCEEDED;
        levelSlice.caseReducers.resetLevel(state);
        state.level.entity = action.payload || null;
        if (action.payload) {
          const immutableCoordinates: ICoordinate[] =
            MatrixUtils.getFilledCoordinates(action.payload.matrix);

          immutableCoordinates.forEach(({x, y}: ICoordinate) => {
            if (!state.level.immutabilityMatrix[x]) {
              state.level.immutabilityMatrix[x] = [];
            }
            state.level.immutabilityMatrix[x][y] = true;
          });

          state.level.emptyCoordinatesCount = 81 - immutableCoordinates.length;

          levelsAdapter.setOne(state.levels, action.payload);
        }
      })
      .addCase(getLevel.rejected, (state) => {
        state.level.status = RequestStatus.FAILED;
      });
  },
});

const levelsSelectors = levelsAdapter.getSelectors<RootState>(
  (state: RootState) => state.level.levels
);

export const selectLevels = (state: RootState): ILevel[] =>
  levelsSelectors.selectAll(state);

export const selectLevelsStatus = (state: RootState): RequestStatus =>
  state.level.levels.status;

export const selectLevel = (state: RootState): ILevel | null =>
  state.level.level.entity;

export const selectLevelStatus = (state: RootState): RequestStatus =>
  state.level.level.status;

export const selectCoordinateValue =
  (coordinate: ICoordinate) => (state: RootState) =>
    state.level.level.entity?.matrix[coordinate.x][coordinate.y] || null;

export const selectActiveCoordinate = (state: RootState): ICoordinate | null =>
  state.level.level.activeCoordinate;

export const checkMutability =
  ({x, y}: ICoordinate) =>
  (state: RootState): boolean =>
    !state.level.level.immutabilityMatrix[x]?.[y];

export const checkIsWrong =
  ({x, y}: ICoordinate) =>
  (state: RootState): boolean => {
    return !!state.level.level.errorMatrix[x]?.[y];
  };

export const checkIsIntersection =
  ({x, y}: ICoordinate) =>
  (state: RootState): boolean => {
    return !!state.level.level.intersections.some(
      (c: ICoordinate) => c.x === x && c.y === y
    );
  };

export const checkIsSolved = (state: RootState): boolean =>
  state.level.level.isSolved;

export const {changeActiveCoordinate, changeActiveCoordinateValue} =
  levelSlice.actions;

export const levelReducer = levelSlice.reducer;
