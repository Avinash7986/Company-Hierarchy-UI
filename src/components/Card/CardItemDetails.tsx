import React from 'react'
import { FiPhone, FiMail } from 'react-icons/fi'
import './cardItemDetails.css'

const CardItemDetails = ({ item }: { item: any }) => {
  return (
    <div className='card__item__data__details'>
      <h4>{item.name}</h4>
      <div className='item-flex'>
        <FiPhone />
        <p>{item.phoneNumber}</p>
      </div>
      <div className='item-flex'>
        <FiMail />
        <p>{item.emailId}</p>
      </div>
    </div>
  )
}

export default CardItemDetails
