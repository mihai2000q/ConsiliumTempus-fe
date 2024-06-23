import { Divider, Grid, Skeleton, Stack } from "@mui/material";

function ProjectTaskDrawerLoader() {
  return (
    <Stack mt={1}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mx={2} mb={1}>
        <Skeleton variant={'rectangular'} width={150} height={30} sx={{ borderRadius: 1 }} />

        <Stack direction={'row'} spacing={1}>
          {Array.from(Array(4)).map((_, i) => (
            <Skeleton key={i} variant={'circular'} width={25} height={25} sx={{ borderRadius: 1.5 }} />
          ))}
        </Stack>
      </Stack>
      <Divider />

      <Stack mx={2}>
        <Skeleton variant={'text'} width={'100%'} height={50} />
        <Grid container rowSpacing={1} alignItems={'center'}>
          <Grid item xs={3}>
            <Skeleton variant={'text'} width={100} height={30} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant={'text'} width={125} height={40} sx={{ borderRadius: 1 }} />
          </Grid>

          <Grid item xs={3}>
            <Skeleton variant={'text'} width={50} height={30} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant={'text'} width={90} height={40} sx={{ borderRadius: 1 }} />
          </Grid>

          <Grid item xs={3}>
            <Skeleton variant={'text'} width={68} height={30} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant={'text'} width={150} height={40} sx={{ borderRadius: 1 }} />
          </Grid>
        </Grid>
        <Skeleton variant={'rectangular'} width={'100%'} height={300} sx={{ borderRadius: 1, mt: 2 }} />
      </Stack>
    </Stack>
  );
}

export default ProjectTaskDrawerLoader;