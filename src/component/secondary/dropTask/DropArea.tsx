import React, { useState, useEffect } from 'react';
import { DropAreaProps } from '../../PropAbstraction/abstract';

const DropArea = (props : DropAreaProps) => {
  const [showdrop, setShowdrop] = useState<boolean>(false);

  

  const handleDragEnter = () => {
    setShowdrop(true);
    console.log(showdrop);
  };

  const handleDragLeave = () => {
    setShowdrop(false);
    console.log(showdrop);
  };

  return (
    <div style={{transition : 'all 0.2s ease-in-out'}}
      className={` ${
        showdrop ? 'w-full h-full border-2 border-gray-500 border-dashed rounded-lg p-9 my-9 transition-all translate-y-1 translate-x-1 ease-in-out opacity-10' : 'opacity-0'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={()=>{
        props.onDrop(props.categoryTitle, props.index);
        setShowdrop(false)
      }}
      onDragOver={(e )=> e.preventDefault()}
    >
      Drop area
    </div>
  );
};

export default DropArea;