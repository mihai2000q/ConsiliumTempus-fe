import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

export default function usePageSize() {
  const theme = useTheme()
  const isSmallSized = useMediaQuery(theme.breakpoints.up('xs'))
  const isMediumSized = useMediaQuery(theme.breakpoints.up('md'))
  const isLargeSized = useMediaQuery(theme.breakpoints.up('xl'))

  const [pageSize, setPageSize] = useState(
    isLargeSized ? 12 : isMediumSized ? 10 : isSmallSized ? 6 : 1
  )

  useEffect(() => {
    if (isLargeSized) {
      setPageSize(12)
    } else if (isMediumSized) {
      setPageSize(10)
    } else if (isSmallSized) {
      setPageSize(6)
    }
  }, [isSmallSized, isMediumSized, isLargeSized])

  return pageSize
}