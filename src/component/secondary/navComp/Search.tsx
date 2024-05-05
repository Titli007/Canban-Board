import React, { useState } from 'react'
import { searchProps } from '../../PropAbstraction/abstract'

const Search = (props : searchProps) => {
  
  return (
    <div>
      <div className='border-2 border-gray-300 w-min flex shadow-sm rounded-lg'>
          <span className='ml-2'>#</span>
          <input className='outline-none mx-4' placeholder='Search by issue name...'
          onChange={(e)=>{props.setSearchText(e.target.value)}}/>
      </div>
    </div>
  )
}

export default Search
