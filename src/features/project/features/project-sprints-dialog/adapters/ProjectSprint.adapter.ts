import dayjs from "dayjs";
import ProjectSprintResponse from "../types/ProjectSprint.response.ts";
import ProjectSprint from "../types/ProjectSprint.model.ts";

export default class ProjectSprintAdapter {
  static adapt(sprint: ProjectSprintResponse | undefined) : ProjectSprint | undefined {
    if (!sprint) return undefined

    return {
      ...sprint,
      startDate: sprint.startDate ? dayjs(sprint.startDate) : null,
      endDate: sprint.endDate ? dayjs(sprint.endDate) : null,
      createdDateTime: dayjs(sprint.createdDateTime),
      updatedDateTime: dayjs(sprint.updatedDateTime),
    }
  }
}