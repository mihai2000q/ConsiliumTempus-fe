import { createApi } from "@reduxjs/toolkit/query/react";
import TagTypes from "../utils/enums/TagTypes.ts";
import { queryWithRedirection } from "./api.query.ts";

export const api = createApi({
  baseQuery: queryWithRedirection,
  reducerPath: 'api',
  tagTypes: [...Object.values(TagTypes)],
  endpoints: () => ({})
})