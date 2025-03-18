import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {IUser, RequestStatus} from '../data-structures';
import {RootState} from './store';

const usersAdapter = createEntityAdapter<IUser>();

export interface IUserState {
  user: {
    entity: IUser | null;
    status: RequestStatus;
    lastAvailableLevel: number;
  };
  users: {
    ids: string[];
    entities: Record<string, IUser>;
    status: RequestStatus;
  };
}

const initialState: IUserState = {
  user: {
    entity: null,
    status: RequestStatus.IDLE,
    lastAvailableLevel: 1,
  },
  users: {ids: [], entities: {}, status: RequestStatus.IDLE},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLastAvailableLevel: (state: IUserState, action) => {
      const requestedAvailableLevel = action.payload + 1;

      if (requestedAvailableLevel > state.user.lastAvailableLevel) {
        state.user.lastAvailableLevel = requestedAvailableLevel;
      }
    },
  },
});

const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state: RootState) => state.user.users
);

export const selectUsers = (state: RootState): IUser[] =>
  usersSelectors.selectAll(state);

export const selectLastAvailableLevel = (state: RootState): number =>
  state.user.user.lastAvailableLevel;

export const {changeLastAvailableLevel} = userSlice.actions;

export const userReducer = userSlice.reducer;
