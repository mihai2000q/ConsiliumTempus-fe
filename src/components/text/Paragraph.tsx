import { Typography } from '@mui/material'
import { TypographyVariant } from '@mui/material/styles'
import { ReactNode } from 'react'

interface ParagraphProps {
  children: ReactNode
  paragraph?: boolean | undefined
  fontWeight?: string | number | undefined
  color?: string | undefined
  variant?: TypographyVariant | undefined
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
      color={color}
      variant={variant}
      sx={{
        fontWeight: fontWeight,
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        marginBottom: paragraph ? '16px' : undefined
      }}
    >
      {children}
    </Typography>
  )
}

export default Paragraph
