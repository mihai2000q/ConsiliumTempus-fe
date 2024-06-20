import { Skeleton, Stack } from "@mui/material";

interface DrawerListLoaderProps {
  count?: number
}

function DrawerListLoader({
  count = 5
}: DrawerListLoaderProps) {
  return (
    <Stack>
      {Array.from(Array(count)).map((_, i) => (
        <Skeleton
          key={i}
          variant={'rectangular'}
          height={35}
          sx={{
            borderRadius: '10px',
            margin: '1px 16px',
          }} />
      ))}
    </Stack>
  );
}

export default DrawerListLoader;