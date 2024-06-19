import dayjs from "dayjs";
import { ProjectSprintsResponse } from "../types/ProjectSprints.response.ts";
import ProjectSprints from "../types/ProjectSprints.model.ts";

export default class ProjectSprintsAdapter {
  static adapt(sprints: ProjectSprintsResponse | undefined) : ProjectSprints | undefined {
    if (!sprints) return undefined

    return sprints.map((sprint) => ({
      ...sprint,
      startDate: sprint.startDate ? dayjs(sprint.startDate) : null,
      endDate: sprint.endDate ? dayjs(sprint.endDate) : null,
      createdDateTime: dayjs(sprint.createdDateTime)
    }))
  }
}