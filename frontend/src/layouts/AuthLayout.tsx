import React from 'react'
import runningImage from '../assets/icons/dashboard.gif'

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout:React.FC<AuthLayoutProps> = ({children}) => {
  return (
   <div className="flex h-screen w-screen">

      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <img src={runningImage} alt="Truck" className="max-w-md w-[553px] h-[420px]" />
      </div>

      <div className="flex-1 flex flex-col items-center shadow-xl justify-center px-4 w-[100%] bg-white">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
