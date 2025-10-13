import React from 'react'
import SideBar from '../components/SideBar';
import TopMenuBar from '../components/TopMenuBar';

const DashboardLayout :React.FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <div className='flex flex-row w-screen h-screen overflow-hidden'>
      <SideBar/>
      <div className='flex flex-1 flex-col w-full overflow-hidden'>
        <TopMenuBar />
          <main className='flex-1 p-3 bg-gray-100 w-full h-full'>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout
