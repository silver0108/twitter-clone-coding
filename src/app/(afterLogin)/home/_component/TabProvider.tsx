"use client";

import { ReactNode, createContext, useState } from "react";


// context로 상태 관리
export const TabContext = createContext({
  tab: 'rec',
  setTab: (value: 'rec' | 'fol') => {}
})

type Props = { children : ReactNode };

export default function TabProvider({children} : Props) {
  const [tab, setTab] = useState('rec');

  return (
    <TabContext.Provider value={{tab, setTab}}>
      {children}
    </TabContext.Provider>
  )
}