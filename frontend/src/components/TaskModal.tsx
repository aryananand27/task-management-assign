import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../store/services/tasksServices'; 
import type { AppDispatch, RootState } from '../store';
import type { TaskRequests } from '../types/tasks';
import updateIcon from '../assets/icons/editIcon.svg';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';

interface ScheduleMeetingModalProps<T> {
  buttonText?: string;
  onClose?: () => void;
  onSubmit?: (data: T) => void;
  field1?: string;
  field2?: string;
  modalTitle?: string;
  isOptions?: boolean;
  selectedRow?: string[] | null;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  padding: '16px 16px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  position: 'relative',
  maxHeight: '95vh',
  marginTop: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 24px 24px rgba(0, 0, 0, 0.24)',
  padding: '36px 81px',
  overflowY: 'auto',
  display: 'block',
  borderRadius: '8px',
};

const TaskModal = <T extends Record<string, any> = TaskRequests>({
  isOptions = false,
  onClose,
  modalTitle,
  selectedRow,
}: ScheduleMeetingModalProps<T>) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<TaskRequests>({
    userId: user?.id ?? 0,
    title: '',
    description: '',
    status: false,
  });
  const navigate=useNavigate();

  useEffect(() => {
    if (open && isOptions && selectedRow) {
      const [taskNo, title, description, status] = selectedRow;
      const taskId = parseInt(taskNo.replace('T', ''));
      setFormData({
        userId: user?.id ?? 0,
        title: title || '',
        description: description || '',
        status: status === 'Completed' ? false : true,
      });
    } else if (open && !isOptions) {
      setFormData({
        userId: user?.id ?? 0,
        title: '',
        description: '',
        status: false,
      });
    }
  }, [open, isOptions, selectedRow, user?.id]);

  const handleOpen = () => setOpen(true);
  const handleCloseInternal = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleSubmitInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error('No user logged in');
      navigate('/');
      return;
    }
    try {
      const taskData = { ...formData, userId: user.id };
      let result;
      if (isOptions && selectedRow) {
        const taskNo = selectedRow[0];
        const taskId = parseInt(taskNo.replace('T', ''));
        if (isNaN(taskId)) {
          toast.error('Invalid task ID');
          return;
        }
        result = await dispatch(updateTask({ id: taskId, updates: {userId:user?.id, title: taskData.title, description: taskData.description, status: taskData.status } })).unwrap();
        toast.success('Task updated');
      } else {
        result = await dispatch(createTask(taskData)).unwrap();
        toast.success('Task created');
      }
      setOpen(false);
     
    } catch (err: any) {
        console.log('Task operation failed',err)
      toast.error('Task operation failed',err);
    }
  };

  return {
    trigger: (
      <>
        {!isOptions ? (
          <button
            className="bg-[#1F222E] text-white px-24 py-3 rounded-lg font-medium cursor-pointer font-poppins text-base focus:outline-none"
            onClick={handleOpen}
          >
            Create Task
          </button>
        ) : (
          <button
            className="flex bg-transparent justify-center focus:outline-none items-center"
            onClick={handleOpen}
          >
            <img src={updateIcon} alt="Edit" className="w-5 h-5" />
          </button>
        )}
      </>
    ),
    modal: open ? (
      <>
        <style>
          {`
            .custom-checkbox:checked::after {
              content: '✔';
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              color: #FFFFFF;
              font-size: 12px;
              font-weight: bolder;
            }
          `}
        </style>
        <div style={overlayStyle}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2
              id="schedule-meeting-modal-title"
              className="text-xl pb-1 font-poppins font-medium mb-8 text-[#333333]"
            >
              {modalTitle}
            </h2>
            <form onSubmit={handleSubmitInternal}>
              <label className="text-sm text-[#666666] font-poppins font-normal mb-2">Title</label>
              <input
                className="w-full rounded-xl bg-transparent border h-12 border-[#666666] my-2 mb-8 focus:outline-none text-gray-800 font-poppins p-2"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <label className="text-sm text-[#666666] font-poppins font-normal mb-2">Description</label>
              <input
                className="w-full rounded-xl bg-transparent border h-12 border-[#666666] my-2 mb-8 focus:outline-none text-gray-800 font-poppins p-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <label className="text-sm text-[#666666] font-poppins font-normal mb-2">Status</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center border border-[#D1D1D6] p-[6px] px-[12px] rounded">
                  <input
                    type="checkbox"
                    className="form-checkbox w-4 h-4 rounded-md bg-white checked:bg-[#17428E] checked:border-2 checked:border-[#17428E] border border-[#8E8E93] focus:outline-none transition-colors duration-200 appearance-none custom-checkbox"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  />
                  <span className="ml-2 text-[13px] text-[#48484A] font-poppins font-medium">Pending</span>
                </label>
                <label className="inline-flex items-center border border-[#D1D1D6] p-[6px] px-[12px] rounded">
                  <input
                    type="checkbox"
                    className="form-checkbox w-4 h-4 rounded-md bg-white checked:bg-[#17428E] checked:border-2 checked:border-[#17428E] border border-[#8E8E93] focus:outline-none transition-colors duration-200 appearance-none custom-checkbox"
                    checked={!formData.status}
                    onChange={(e) => setFormData({ ...formData, status: !e.target.checked })}
                  />
                  <span className="ml-2 text-[13px] text-[#48484A] font-poppins font-medium">Completed</span>
                </label>
              </div>
              <div className="w-full space-x-8 flex mt-4">
                <button
                  type="submit"
                  className="bg-[#17428E] text-white rounded-lg font-poppins text-lg p-2 font-normal focus:outline-none w-[150px]"
                >
                  {isOptions ? 'Save' : 'Add'}
                </button>
                <button
                  className="bg-transparent border border-[#17428E] text-[#17428E] font-poppins text-lg rounded-lg p-2 focus:outline-none w-[150px]"
                  onClick={handleCloseInternal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    ) : null,
  };
};

export default TaskModal;