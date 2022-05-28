import React, { ChangeEvent, FormEvent } from 'react'

interface IEmployeeForm {
  name: string
  phoneNumber: string
  emailId: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent) => void
}

const EmployeeForm = ({
  name,
  phoneNumber,
  emailId,
  handleChange,
  handleSubmit,
}: IEmployeeForm) => {
  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className='form-field'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='phoneNumber'>Phone Number</label>
        <input
          type='tel'
          name='phoneNumber'
          id='phoneNumber'
          value={phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='emailId'>Email</label>
        <input
          type='email'
          name='emailId'
          id='emailId'
          value={emailId}
          onChange={handleChange}
        />
      </div>

      <button className='btn' type='submit'>
        Submit
      </button>
    </form>
  )
}

export default EmployeeForm
