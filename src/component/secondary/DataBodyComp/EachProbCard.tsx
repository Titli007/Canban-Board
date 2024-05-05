import React, { useState } from 'react'
import { ProblemListProps } from '../../PropAbstraction/abstract'
import { ProblemState, deleteProblem } from '../../../redux/slices/problemSlice'
import { useDispatch } from 'react-redux';
import { titleMapper } from '../../../utils';

const EachProbCard = (props : ProblemListProps) => {

  

  const dispatch = useDispatch()
  const propDate : string = props.eachProb.createdAt


  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
  
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };
  
  const formattedDate = formatDate(propDate);



  const mappedTitle : string = titleMapper[props.categoryTitle]
  console.log(mappedTitle)

  const handleDelete = () => {
    console.log(titleMapper[props.categoryTitle], props.index)
    dispatch(deleteProblem({ category: titleMapper[props.categoryTitle] as keyof ProblemState, index: props.index }));
  }
  

  const colorsMap: Record<string, string> = {
    critical: 'bg-red-900 text-white',
    high: 'bg-red-500 text-white',
    medium: 'bg-orange-500 text-white',
    low: 'bg-yellow-500 text-white',
    Hypejab: 'bg-pink-200 text-pink-800',
    Getastra: 'bg-blue-100 text-blue-800',
    'Source Code': 'bg-orange-100 text-orange-800'
  };
  
  
  return (
    <div key={props.index} className='border-2 rounded-md mb-4 shadow-sm py-2 px-3' 
    draggable 
    onDragStart={()=>{props.setActiveCard(mappedTitle); props.setActiveIndex(props.index)}}
    onDragEnd={()=>{props.setActiveCard(null); props.setActiveIndex(null)}}
    >
        <span className='opacity-60 mr-3'>#8793 </span>
        <span className='opacity-60 mr-2'>{formattedDate} </span>
        <button className='bg-red-400 m-2 py-1 px-2 rounded-md' onClick={handleDelete}>delete</button>
        <p className='font-medium mb-4 px-1'>{props.eachProb.title}</p>
        {
            props.eachProb.labels.map((data:string, index: number)=>{
                return(
                    <span key={index} className={`${colorsMap[data]} py-0.5 px-2 rounded-2xl mr-2`}>  {data}</span>
                  )
            })
        }
    </div>
  )
}

export default EachProbCard
