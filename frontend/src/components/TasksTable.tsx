// src/components/TasksTable.tsx
import React, { useEffect, useState } from 'react';
import SidePanel from '../pages/dashboard/SidePanel';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import TaskModal from './TaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks } from '..//store/services/tasksServices';
import type { AppDispatch, RootState } from '../store';
import {toast} from "react-toastify"

interface CustomerCommonTableProps {
  columns: string[];
  rows: string[][];
  statusStyles?: { [key: string]: { backgroundColor: string; color: string } };
}

interface TableProps {
  data: CustomerCommonTableProps;
}

const TasksTable: React.FC<TableProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [colCount, setColCount] = useState(7);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string[] | null>(null);

  useEffect(() => {
    setColCount(data?.columns?.length + 1);
  }, [data?.columns?.length]);



  const handleRowClick = (row: string[]) => {
    setSelectedRow(row);
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setSelectedRow(null);
  };

  const isStatusColumn = data.columns.length > 0 && data.columns[data.columns.length - 1] === 'Status';
  const { trigger: TaskTrigger, modal: TaskModals } = TaskModal({
    modalTitle: 'Edit Task',
    isOptions: true,
    selectedRow,
  });

  const handleDeleteTask = async (row: string[]) => {
    if (!user?.id) {
      toast.error('No user logged in');
      return;
    }
    const taskId = parseInt(row[0].replace('T', ''));
    if (isNaN(taskId)) {
      toast.error('Invalid task ID');
      return;
    }

      try {
        await dispatch(deleteTask({ id: taskId })).unwrap();
       toast.success('Task deleted successfully');
        await dispatch(fetchTasks({ userId: user.id }));
      } catch (err: any) {
        toast.error('Failed to delete task');
      }
    
  };

  return (
    <div className="w-full flex border-none mt-2 relative rounded-md">
      <div
        className={`transition-all border-none duration-300 ${isMenuOpen ? 'w-[55%]' : 'w-full mr-0'}`}
        style={{ height: '100%', overflow: 'auto' }}
      >
        <div className="bg-transparent w-full mb-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>

          <div
            className="grid bg-white mb-6 gap-2"
            style={{
              gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
              userSelect: 'none',
            }}
          >
            {data.columns.map((col, index) => (
              <span
                key={index}
                className="text-[#6B6B6B] font-normal font-poppins text-sm text-left py-4 px-4"
              >
                {col}
              </span>
            ))}
            <span className="text-[#6B6B6B] font-normal font-poppins text-sm text-center py-4 px-4">
              Actions
            </span>
          </div>
          {data.rows?.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid text-sm font-poppins cursor-pointer font-medium text-[#1F1F1F] mb-4 gap-2 bg-white hover:bg-gray-100"
              style={{
                minHeight: '80px',
                userSelect: 'none',
                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
              }}
              onClick={() => handleRowClick(row)}
            >
              {row.map((cell, cellIndex) => {
                const statusStyle = isStatusColumn && cellIndex === data.columns.length - 1 && data.statusStyles?.[cell]
                  ? data.statusStyles[cell]
                  : { backgroundColor: 'transparent', color: '#1F1F1F' };

                return (
                  <div
                    key={cellIndex}
                    className="p-4 px-4 text-left relative"
                    style={{
                      minHeight: '80px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      userSelect: 'none',
                    }}
                  >
                    {cellIndex === data.columns.length - 1 && isStatusColumn ? (
                      <span
                        className="inline-block px-2 py-2 rounded text-center"
                        style={{
                          width: '120px',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          backgroundColor: statusStyle.backgroundColor,
                          color: statusStyle.color,
                        }}
                      >
                        {cell}
                      </span>
                    ) : (
                      <span
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          userSelect: 'none',
                        }}
                      >
                        {cell}
                      </span>
                    )}
                  </div>
                );
              })}
    
              <div
                className="p-4 px-4 text-center relative"
                style={{
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  userSelect: 'none',
                }}
                onClick={(e) =>{ e.stopPropagation(); setSelectedRow(row)}}
              >
                {TaskTrigger}
                <button
                  className="flex bg-transparent justify-center focus:outline-none items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(row);
                  }}
                >
                  <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`bg-white shadow-lg transition-transform duration-300 transform h-auto ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: isMenuOpen ? '45%' : '0',
          height: `100vh`,
          position: 'relative',
          top: '0',
          right: '0',
          marginLeft: isMenuOpen ? '16px' : '0',
        }}
      >
        {isMenuOpen && selectedRow && <SidePanel onClose={handleCloseMenu} selectedRow={selectedRow} />}
      </div>
      {TaskModals}
    </div>
  );
};

export default TasksTable;