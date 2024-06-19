import { Dayjs } from "dayjs";

type ProjectSprints = ProjectSprint[]
export default ProjectSprints;

interface ProjectSprint {
  id: string,
  name: string,
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  createdDateTime: Dayjs
}