import React from 'react'
import { FiEdit, FiTrash2, FiMove, FiUserPlus } from 'react-icons/fi'

interface ICardFilterActions {
  itemType: string
  handleDrawerOpen: (val: string) => void
  handleDelete: () => void
}

const CardFilterActions = ({
  itemType,
  handleDrawerOpen,
  handleDelete,
}: ICardFilterActions) => {
  return (
    <div className='card__filter_icons'>
      <FiEdit
        className='filter_icon'
        onClick={() => handleDrawerOpen('edit')}
      />
      {(itemType === 'head' || itemType === 'team') && (
        <FiUserPlus
          className='filter_icon'
          onClick={() => handleDrawerOpen('add')}
        />
      )}

      {itemType === 'team-member' && (
        <>
          <FiMove
            className='filter_icon'
            onClick={() => handleDrawerOpen('move')}
          />
          <FiTrash2 className='filter_icon' onClick={handleDelete} />
        </>
      )}
    </div>
  )
}

export default CardFilterActions
