import { Button, Skeleton, Stack } from "@mui/material";

function TopbarUserLoader() {
  return (
    <Button sx={{ borderRadius: '8px' }}>
      <Stack direction="row" justifyContent="center" alignItems={"center"}>
        <Skeleton variant={"circular"} width={40} height={40}  />
      </Stack>
    </Button>
  );
}

export default TopbarUserLoader;