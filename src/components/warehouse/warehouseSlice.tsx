import { createSlice, createSelector } from "@reduxjs/toolkit";
import { IData } from "../../types/types";
import { createAppAsyncThunk } from "../../types/types";
import { RootState } from "../../types/types";
import { filterItems } from "../../utils/utils";
import { useHttp } from "../../hooks/http.hook";
import { json3 } from "../../data";

export const fetchData = createAppAsyncThunk<IData[]>("data/fetchData", () => {
  const { request } = useHttp();
  return request(json3);
});

export const filteredWarehouseSelector = createSelector(
  [
    (state: RootState) => state.warehouse.data,
    (state: RootState) => state.filter.filter,
    (state: RootState) => state.filter.search,
  ],
  (data, filter, search) => {
    return filterItems(data, filter, search);
  },
);

interface IInitialState {
  data: IData[];
  dataLoadingStatus: string;
}

const initialState: IInitialState = {
  data: [],
  dataLoadingStatus: "idle",
};

const slice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.dataLoadingStatus = "loading";
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.dataLoadingStatus = "idle";
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.dataLoadingStatus = "error";
    });
  },
});

const { actions, reducer } = slice;
export default reducer;
export const {} = actions;
