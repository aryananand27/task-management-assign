import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import TasksTable from '../../components/TasksTable';
import TaskModal from '../../components/TaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, fetchTasks } from '../../store/services/tasksServices';
import type { AppDispatch, RootState } from '../../store';
import type { Task } from '../../types/tasks';
import {toast} from "react-toastify"

const Dashboard: React.FC = () => {
  const [data, setData] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const paidTableData = {
    columns: ['Task ID', 'Title', 'Description', 'Status'],
    rows: tasks?.map((task) => [
      `T${task.id.toString().padStart(4, '0')}`,
      task.title || 'No Title',
      task.description || 'No Description',
      task.status ? 'Pending' : 'Completed',
    ]),
    statusStyles: {
      Pending: { backgroundColor: '#AC39E6', color: '#FFFFFF' },
      Completed: { backgroundColor: '#4CAF50', color: '#FFFFFF' },
    },
  };

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchTasks({ userId: user.id }));
    } else {
      toast.warn('User not authenticated or ID missing, tasks not fetched');
    }
  }, [dispatch, isAuthenticated, user?.id]);

  useEffect(() => {
    setData(!(tasks?.length>0));

  }, [tasks]);

  const { trigger: TaskTrigger, modal: TaskModals } = TaskModal({
    modalTitle: 'Create Task',
    onSubmit: (data: Task) => {
      if (isAuthenticated && user?.id) {
        dispatch(createTask({ ...data, userId: user.id }))
          .unwrap()
          .then((result) => {
           toast.success('Task created');
            dispatch(fetchTasks({ userId: user.id }));
          })
          .catch((err) => {
            toast.error('Task creation failed',err);
          });
      } else {
        toast.error('No user logged in or not authenticated');
      }
    },
  });

  return (
    <DashboardLayout>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : !data ? (
        <div className="flex flex-col h-screen">
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl text-[#2A2A2A] font-poppins font-medium">Tasks List</h1>
            {TaskTrigger}
          </div>
          <div className="mt-4 h-auto">
            <TasksTable data={paidTableData} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen mt-4">
          <div>
            <h1 className="text-2xl text-[#2A2A2A] font-poppins font-medium">Tasks List</h1>
          </div>
          <div className="flex-1 h-full flex justify-center items-center">
            {TaskTrigger}
          </div>
        </div>
      )}
      {TaskModals}
    </DashboardLayout>
  );
};

export default Dashboard;