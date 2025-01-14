import {ReactNode, createContext, useContext, useState } from "react";

const ShowChildrenContext = createContext({
  showChildren: true,
  toggleVisibility: () => {}
})

const useShowChildrenContext = () => useContext(ShowChildrenContext)

interface Props {
  children?: ReactNode;
}

const ShowChildrenProvider = ({children} : Props) => {
  const [showChildren, setShowChildren] = useState(true)
  const toggleVisibility = () => setShowChildren(prev => !prev)
  return (
    <ShowChildrenContext.Provider value={{showChildren, toggleVisibility}}>
      {children}
    </ShowChildrenContext.Provider>
  )
}

export {useShowChildrenContext, ShowChildrenProvider}

