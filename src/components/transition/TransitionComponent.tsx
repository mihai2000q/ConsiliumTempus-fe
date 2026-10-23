import { HTMLAttributes, Ref } from 'react'

function TransitionComponent({
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} {...props}>
      {props.children}
    </div>
  )
}

export default TransitionComponent
