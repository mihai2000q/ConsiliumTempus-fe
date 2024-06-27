import Workspace from "./Workspace.model.ts";

export default interface GetWorkspacesResponse {
  workspaces: Workspace[],
  totalCount: number
}