import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { ReactNode } from 'react'

interface ParagraphProps {
  children: ReactNode,
  paragraph?: boolean | undefined,
  fontWeight?: string | number | undefined,
  color?: string | undefined,
  variant?: Variant | undefined,
  lines?: number | undefined
}

function Paragraph({
                     children,
                     fontWeight,
                     color,
                     variant,
                     lines = 2,
                     paragraph = true
                   }: ParagraphProps) {
  return (
    <Typography
      paragraph={paragraph}
      fontWeight={fontWeight}
      color={color}
      variant={variant}
      sx={{
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }}>
      {children}
    </Typography>
  )
}

export default Paragraph
