import React from 'react';
import crossCustomer from '../../assets/icons/crossCustomer.svg'


const SidePanel: React.FC<{onClose:()=>void; selectedRow:string[]|null}>= ({onClose,selectedRow }) => {
 
 

  return (
    <div className="p-6 px-5 bg-white rounded-3xl shadow-lg flex flex-col h-full">

      <div className="flex justify-between items-center mb-10 py-2 border-b border-[#E3E3E3] px-4">
        <h2 className="text-xl font-poppins font-medium text-[#2A2A2A]">Task Details</h2>
        <div className='flex justify-center items-center space-x-4'>
          <button onClick={onClose} className="bg-white rounded-full p-1 focus:outline-none hover:bg-gray-100 transition">
            <img src={crossCustomer} alt="Close" className="w-6 h-6" />
          </button>
        </div>
      </div>
        <div className='p-1 mt-4 flex flex-col space-y-8'>
            <div className={`flex flex-col p-4 rounded-lg shadow-sm space-y-4 bg-[#E7FFEC]`}>
                <span className='text-[#091568] font-poppins font-medium text-sm'>Title</span>
                <span className='text-[#000000] font-light font-poppins text-sm'>{selectedRow?.[1] || "Title123"}</span>
            </div>
          <div className={`flex flex-col p-4 rounded-lg shadow-sm space-y-4 bg-[#E7FFEC]`}>
                <span className='text-[#091568] font-poppins font-medium text-sm'>Description</span>
                <span className='text-[#000000] font-light font-poppins text-sm'>{selectedRow?.[2] || "Description123"}</span>
            </div>
            <div className='flex flex-col space-y-4'>
                <span className='text-[#091568] font-poppins font-medium text-sm'> Status</span>
                <span
                            className="inline-block px-2 py-2 rounded text-center"
                            style={{
                              width: '120px',
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 4,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              userSelect: 'none',
                              backgroundColor: `${selectedRow?.[3]==="Pending" ?'#AC39E6':'#4CAF50'}`,
                              color: '#FFFFFF',
                            }}
                          >
                            {selectedRow?.[3] || "Pending"}
                          </span>
            </div>
        </div>
    </div>
  );
};

export default SidePanel;