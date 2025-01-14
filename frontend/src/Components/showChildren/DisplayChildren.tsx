import { useShowChildrenContext } from "./ShowChildrenContext"
import { ReactNode } from "react"
interface Props {
  children: ReactNode;
}

const DisplayChildren = ({children} : Props) => {
  const {showChildren} = useShowChildrenContext()

  return (
    <>
      {showChildren ? children : null}
    </>
    
  )
}

export default DisplayChildren