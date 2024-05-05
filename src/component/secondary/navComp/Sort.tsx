import React, { useState } from 'react'
import { sortProps } from '../../PropAbstraction/abstract'

const Sort = (props : sortProps) => {
  const[sortValue, setSortValue] = useState<string>('')

  if(sortValue==='Newest First'){
    props.setIsSort(true)
  }
  else{
    props.setIsSort(false)
  }

  return (
    <div className='border-2 border-gray-300 shadow-sm rounded-lg px-2'>
      <span>#</span>
      <select className='outline-none' onChange={(e)=>setSortValue(e.target.value)}>
        <option>Sort By</option>
        <option>Newest First</option>
        <option>Oldest First</option>
      </select>
    </div>
  )
}

export default Sort