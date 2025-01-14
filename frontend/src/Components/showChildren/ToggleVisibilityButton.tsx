import { useShowChildrenContext } from "./ShowChildrenContext"
import { ReactNode } from "react"

interface Props {
  className?: string;
  children?: ReactNode;
}

const ToggleVisibilityButton = ({className, children}: Props) => {
  const {toggleVisibility} = useShowChildrenContext()

  return (
    <button onClick={toggleVisibility} className={className}>
      {children}
    </button>
  )
}

export default ToggleVisibilityButton