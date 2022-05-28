import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useAppSelector } from '../../app/hooks'
import { getAllData } from '../../features/companyHierarchy/companyHierarchySlice'
import Drawer from '../Drawer/Drawer'
import Search from '../Search/Search'
import './topAction.css'

const TopAction = () => {
  const data = useAppSelector(getAllData)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div className='top-container'>
      <div className='top-search' onClick={handleDrawerOpen}>
        <FiSearch />
        <p>Search Employees</p>
      </div>

      {isDrawerOpen && (
        <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
          <Search isOpen allData={data} />
        </Drawer>
      )}
    </div>
  )
}

export default TopAction
