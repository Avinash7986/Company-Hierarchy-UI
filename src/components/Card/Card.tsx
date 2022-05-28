import React, { useState, useCallback } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { removeTeamMember } from '../../features/companyHierarchy/companyHierarchySlice'

import AddTeamForm from '../AddTeam/AddTeamForm'
import Drawer from '../Drawer/Drawer'
import EditTeamName from '../EditTeam/EditTeamName'
import AddUpdateInfoForm from '../AddUpdateInfoForm/AddUpdateInfoForm'
import CardItem from './CardItem'
import CardFilterActions from './CardFilterAction'

import './card.css'
import MoveForm from '../MoveForm/MoveForm'
import { FiMinus, FiMinusCircle, FiPlus, FiPlusCircle } from 'react-icons/fi'

interface ICard {
  item: any
  children?: React.ReactNode
}

const Card = ({ item, children }: ICard) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showMoveForm, setShowMoveForm] = useState(false)
  const dispatch = useAppDispatch()

  const handleToggle = (e: any) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const handleDelete = useCallback(() => {
    const type = item.type
    if (type === 'team-member') {
      dispatch(removeTeamMember({ id: item.id }))
    }
  }, [])

  const handleDrawerOpen = (val: string) => {
    if (val === 'edit') {
      setIsEditable(true)
    }
    if (val === 'add') {
      setShowAddForm(true)
    }

    if (val === 'move') {
      setShowMoveForm(true)
    }
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setIsEditable(false)
    setShowAddForm(false)
    setShowMoveForm(false)
  }

  const itemType = item.type === 'root' || item.type === 'head' ? item.type : ''
  return (
    <>
      <ul
        className={`card ${itemType} ${isOpen ? 'expanded' : ''}`}
        role='list'
      >
        <CardItem item={item} handleToggle={handleToggle}>
          <CardFilterActions
            itemType={item.type}
            handleDelete={handleDelete}
            handleDrawerOpen={handleDrawerOpen}
          />
          {item?.childrens?.length > 0 && (
            <div className='expand-icon' onClick={handleToggle}>
              {isOpen ? <FiMinusCircle /> : <FiPlusCircle />}
            </div>
          )}
        </CardItem>
        {isOpen && <li className={`list ${item.type}`}>{children}</li>}
      </ul>

      {isDrawerOpen && (
        <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
          {isEditable && item.type !== 'team' && (
            <AddUpdateInfoForm
              item={item}
              addEmp={false}
              onClose={handleDrawerClose}
            />
          )}
          {isEditable && item.type === 'team' && (
            <EditTeamName item={item} onClose={handleDrawerClose} />
          )}

          {showAddForm && item.type === 'head' && (
            <AddTeamForm item={item} onClose={handleDrawerClose} />
          )}

          {showAddForm && item.type === 'team' && (
            <AddUpdateInfoForm item={item} addEmp onClose={handleDrawerClose} />
          )}

          {showMoveForm && item.type === 'team-member' && (
            <MoveForm item={item} onClose={handleDrawerClose} />
          )}
        </Drawer>
      )}
    </>
  )
}

export default Card
