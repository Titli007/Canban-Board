import { useState } from 'react';
import { DataBodyProps } from '../../PropAbstraction/abstract';
import EachProbCard from './EachProbCard';
import Modal from '../modal/addModal'; // Import your Modal component
import DropArea from '../dropTask/DropArea';

const ProblemList = (props: DataBodyProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='m-4'>
      <div className='flex justify-between'>
        <div className='flex space-x-2'>
          <p className='font-semibold text-lg'>{props.title}</p>
          <p className=' text-lg'>{props.count}</p>
        </div>
        <button className='font-semibold text-xl' onClick={toggleModal}>+</button> {/* Open modal on button click */}
      </div>
      <div>
        <DropArea onDrop={props.onDrop} categoryTitle={props.title} index={0}/>
        {props.probData &&
          props.probData.map((data, index) => {
            return(
              <div key={index}>
                <EachProbCard eachProb={data} index={index} categoryTitle={props.title} setActiveCard={props.setActiveCard} setActiveIndex={props.setActiveIndex}/>
                <DropArea onDrop={props.onDrop} categoryTitle={props.title} index={index+1}/>
              </div>
              
            ) 
            
          })}
      </div>

      {/* Render modal conditionally */}
      {isModalOpen && (
        <Modal onClose={toggleModal} title={props.title}>
        </Modal>
      )}
    </div>
  );
};

export default ProblemList;