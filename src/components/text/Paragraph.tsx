import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode,
  variant?: Variant | undefined,
  lines?: number | undefined
}

function Paragraph({ variant, lines, children } : ParagraphProps) {
  return (
    <Typography
      paragraph
      variant={variant ?? 'body2'}
      sx={{
        display: '-webkit-box',
        WebkitLineClamp: lines ?? 2,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}>
      {children}
    </Typography>
  );
}

export default Paragraph;