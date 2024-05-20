import { FilterAlt } from "@mui/icons-material";
import { Button } from "@mui/material";

interface ProjectFilterButtonProps {

}

function ProjectFilterButton({ } : ProjectFilterButtonProps) {
  return (
    <>
      <Button variant={'outlined'} startIcon={<FilterAlt />} sx={{ boxShadow: 4 }}>Filter</Button>
    </>
  );
}

export default ProjectFilterButton;