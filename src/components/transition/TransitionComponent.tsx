import React, { ReactNode } from 'react'

const TransitionComponent = React.forwardRef(
  function(
    props: { children: ReactNode },
    ref
  ) {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <div ref={ref} {...props}>
        {props.children}
      </div>
    )
  })

export default TransitionComponent
