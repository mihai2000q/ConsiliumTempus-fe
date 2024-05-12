import Workspace from "./Workspace.model.ts";

export default interface WorkspaceResponse {
  workspaces: Workspace[],
  totalCount: number
}

export interface GetWorkspacesQueryParameters {
  order?: string
}