import { logHistorySliceState } from './log-history-slice';
import { userSliceState } from './user-slice';

export type RootState = {
  logHistory: logHistorySliceState;
  user: userSliceState;
};
