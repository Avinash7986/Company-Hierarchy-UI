import React, { ReactNode } from 'react'
import CardItemDetails from './CardItemDetails'
import './cardItem.css'
import { FiPlus } from 'react-icons/fi'

interface ICardItem {
  item: any
  handleToggle: (e: any) => void
  children: ReactNode
}

const CardItem = ({ item, handleToggle, children }: ICardItem) => {
  const ItemType = item.type

  return (
    <div className={`card__item ${ItemType === 'team' ? 'team' : ''}`}>
      {ItemType === 'team-member' || ItemType === 'team-lead' ? (
        <div className='card__item__data team-member'>
          <span className={`card__item__label ${ItemType}`}>{item.label}</span>
          <CardItemDetails item={item} />
        </div>
      ) : (
        <div className='card__item__data' onClick={handleToggle}>
          <span className={`card__item__label ${ItemType}`}>{item.label}</span>
          {ItemType !== 'team' && <CardItemDetails item={item} />}
        </div>
      )}

      {children}
    </div>
  )
}

export default CardItem
