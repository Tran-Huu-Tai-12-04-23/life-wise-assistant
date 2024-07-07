import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import taskReducer, { resetTeamState } from "./features/team/teamSlice";
import authReducer, { resetAuthState } from "./features/auth/authSlice";
import columnReducer, { resetColumnState } from "./features/column/columnSlice";
import { useDispatch } from "react-redux";
import { clearUserDataFromLocalStorage } from "@/helper";

const rootReducer = combineReducers({
  team: taskReducer,
  auth: authReducer,
  column: columnReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
const store = configureStore({
  reducer: rootReducer,
});

export default store;

export const revertAll = createAction("REVERT_ALL");

export const useResetState = () => {
  const dispatch = useDispatch<AppDispatch>();

  const resetState = async () => {
    try {
      await clearUserDataFromLocalStorage();
      dispatch(resetTeamState());
      dispatch(resetAuthState());
      dispatch(resetColumnState());
      dispatch(revertAll());
    } catch (error) {
      console.error("Error resetting state:", error);
    }
  };

  return {
    resetState,
  };
};
