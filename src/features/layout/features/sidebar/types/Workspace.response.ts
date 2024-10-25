import Workspace from './Workspace.model.ts'

export default interface WorkspaceResponse {
  workspaces: Workspace[],
  totalCount: number
}
