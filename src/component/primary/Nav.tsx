import React, { useEffect } from 'react'
import Search from '../secondary/navComp/Search'
import Sort from '../secondary/navComp/Sort'
import Filter from '../secondary/navComp/Filter'
import { useState } from 'react'
import { navProps } from '../PropAbstraction/abstract'
import { useNavigate } from 'react-router-dom'

const Nav = (props : navProps) => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is logged in
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    } else {

    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("loggedIn")
    navigate('/login')
  }

  return (
    <div className='w-full flex flex-col max-w-[1280px]'>
      <div className="flex text-3xl font-semibold  items-center justify-between m-10">
          <h1 className="text-3xl font-semibold">Canban Board</h1>
          <p className='cursor-pointer' onClick={()=> handleLogout()}>{isLoggedIn? "Log out": "Login"}</p>
      </div>
      <div className='flex space-y-2 sm:space-x-6 sm:space-y-0 mx-10 flex-wrap'>
        <Search setSearchText={props.setSearchText}/>
        <Sort setIsSort={props.setIsSort}/>
        <Filter setFilterText={props.setFilterText}/>
      </div>
    </div>
  )
}

export default Nav
