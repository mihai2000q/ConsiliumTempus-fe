import { Card, CardContent, CardHeader, Divider, Skeleton, Stack } from "@mui/material";

function WorkspaceProjectsLoader() {
  return (
    <Stack width={'100%'} height={'100%'} alignItems={'center'} py={2}>
      <Card variant={'outlined-panel'} sx={{ width: 720 }}>
        <CardHeader
          title={<Skeleton width={100} height={50} />}
          action={
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Skeleton variant={'rectangular'} width={50} height={23} sx={{ borderRadius: 1 }} />
            <Skeleton variant={'rectangular'} width={50} height={23} sx={{ borderRadius: 1 }} />
          </Stack>
        }/>
        <CardContent>
          {Array.from(Array(7)).map((_, i) => (
            <div key={i}>
              <Skeleton variant={'rectangular'} height={85} width={'100%'} sx={{ borderRadius: 4 }} />
              <Divider variant={'middle'} />
            </div>
          ))}
        </CardContent>
      </Card>
    </Stack>
  );
}

export default WorkspaceProjectsLoader;