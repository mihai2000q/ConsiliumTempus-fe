import { ProjectSprintResponse } from "../types/ProjectSprint.response.ts";
import ProjectSprint from "../types/ProjectSprint.model.ts";
import dayjs from "dayjs";

export default class ProjectSprintAdapter {
  static adapt(sprints: ProjectSprintResponse[] | undefined) : ProjectSprint[] | undefined {
    if (!sprints) return undefined

    return sprints.map(ProjectSprintAdapter.adaptSprint)
  }

  private static adaptSprint(sprint: ProjectSprintResponse) : ProjectSprint {
    return {
      ...sprint,
      startDate: sprint.startDate ? dayjs(sprint.startDate) : null,
      endDate: sprint.endDate ? dayjs(sprint.endDate) : null,
    }
  }
}