import React, { useState } from 'react';
import { Problem, addModalProps } from '../../PropAbstraction/abstract';
import { useDispatch } from 'react-redux';
import { ProblemState, addProblem } from '../../../redux/slices/problemSlice';
import { titleMapper } from '../../../utils';

const Modal = (props : addModalProps) => {
  console.log(props.title)
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [label, setLabel] = useState<string>('');



  const handleAddModal = () => {
    // Create a new problem object
    const newProblem: Problem = {
      title: title, 
      createdAt: new Date().toISOString(),
      labels: [priority, label]
    };

    // Dispatch action to add the new problem to Redux store
    dispatch(addProblem({ category: titleMapper[props.title] as keyof ProblemState, problem: newProblem }));

    // Close the modal
    props.onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h1 className="text-xl font-bold mb-4">Add to {props.title}</h1>
        {/* Add form inputs for title, level, and tag */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input type="text" id="title" className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div className="mb-4">
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">Priority Level:</label>
          <select id="level" className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=>setPriority(e.target.value)}>
            <option value="low">select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="mb-4">
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Label:</label>
        <select id="tag" className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e) => setLabel(e.target.value)}>
          <option value="low">select</option>
          <option value="Hypejab" className='bg-purple-300 text-purple-600'>Hypejab</option>
          <option value="Getastra" className='bg-blue-200 text-blue-600'>Getastra</option>
          <option value="Source Code" className='bg-orange-300 text-orange-600'>Source Code</option>
        </select>
        </div>
        {/* Buttons for submitting and closing the addModal */}
        <div className="flex justify-end">
          <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md" onClick={props.onClose}>Cancel</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleAddModal}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
