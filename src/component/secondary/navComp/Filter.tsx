import React from 'react'
import { filterProps } from '../../PropAbstraction/abstract'

const Filter = (props : filterProps) => {
  return (
    <div className='border-2 border-gray-300 shadow-sm rounded-lg px-2'>
      <select className='outline-none' onChange={(e)=>{props.setFilterText(e.target.value)}}>
        <option>Filter</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
        <option>Hypejab</option>
        <option>Getastra</option>
        <option>Source Code</option>
      </select>
    </div>
  )
}

export default Filter
