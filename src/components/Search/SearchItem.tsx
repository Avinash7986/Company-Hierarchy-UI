import React from 'react'
import { FiPhone, FiMail } from 'react-icons/fi'
import { IItem } from './Search'

interface ISearchItem {
  item: IItem
}

const SearchItem = ({ item }: ISearchItem) => {
  return (
    <div className='card__item' style={{ width: '100%' }}>
      <div className='card__item__data team-member'>
        <span className={`card__item__label ${item.type}`}>{item.label}</span>
        <div className='card__item__data__details'>
          <h4>{item.name}</h4>

          <div className='item-flex'>
            <FiPhone />
            <p>{item.phoneNumber}</p>
          </div>
          <div className='item-flex'>
            <FiMail />

            <p>
              <a href={`mailto:${item.emailId}`}>{item.emailId}</a>
            </p>
          </div>

          {item?.under && (
            <div className='item-flex under'>
              <p>{item.under}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchItem
