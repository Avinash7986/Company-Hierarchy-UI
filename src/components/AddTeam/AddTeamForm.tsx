import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { addTeam } from '../../features/companyHierarchy/companyHierarchySlice'
import { validate } from '../../utils/validate'
import './addTeamForm.css'

interface IAddTeamForm {
  item: any
  onClose: () => void
}

const AddTeamForm = ({ item, onClose }: IAddTeamForm) => {
  const dispatch = useAppDispatch()
  const rootChildrens = useAppSelector(
    (state: RootState) => state.companyHierarchy.data[0].childrens
  )
  const [inputValues, setInputValues] = useState({
    teamLabel: '',
    teamLeaderName: '',
    teamLeaderPhoneNumber: '',
    teamLeaderEmailId: '',
    teamMemberName: '',
    teamMemberPhoneNumber: '',
    teamMemberEmailId: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const isValEmpty = (
      Object.keys(inputValues) as (keyof typeof inputValues)[]
    ).some((key) => inputValues[key] === '')
    if (isValEmpty) {
      setErrorMsg('Please fill all fields')
      return
    }

    const isTeamLeadEmailVaild = validate(
      'email',
      inputValues.teamLeaderEmailId
    )
    const isTeamMemberEmailVaild = validate(
      'email',
      inputValues.teamMemberEmailId
    )

    if (!isTeamLeadEmailVaild || !isTeamMemberEmailVaild) {
      return setErrorMsg('Please enter valid email id')
    }

    const isTeamLeadPhoneValid = validate(
      'phoneNumber',
      inputValues.teamLeaderPhoneNumber
    )

    const isTeamMemberPhoneValid = validate(
      'phoneNumber',
      inputValues.teamMemberPhoneNumber
    )

    if (!isTeamLeadPhoneValid || !isTeamMemberPhoneValid) {
      return setErrorMsg('Please enter valid phone number')
    }

    const parent = rootChildrens.find((i) => i.id === item.id)
    if (!parent) {
      setErrorMsg('Failed to add new team')
      return
    }
    const isTeamNameExists = parent.childrens.findIndex(
      (i) => i.label.toLowerCase() === inputValues.teamLabel.toLowerCase()
    )

    if (isTeamNameExists !== -1) {
      setErrorMsg('Team name already exists! Please try a new name')
      return
    }

    setErrorMsg('')
    dispatch(addTeam({ id: item.id, ...inputValues }))
    onClose()
  }

  return (
    <div className='team-form'>
      <h2>Add Team Under {item.label}</h2>

      <form onSubmit={handleSubmit} className='form'>
        <div className='form-field'>
          <label htmlFor='teamLabel'>Team Name</label>
          <input
            type='text'
            name='teamLabel'
            id='teamLabel'
            value={inputValues.teamLabel}
            onChange={handleChange}
          />
        </div>

        <p className='lead'>Team Leader Details</p>
        <div className='form-field'>
          <label htmlFor='teamLeaderName'>Name</label>
          <input
            type='text'
            name='teamLeaderName'
            id='teamLeaderName'
            value={inputValues.teamLeaderName}
            onChange={handleChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='teamLeaderPhoneNumber'>Phone Number</label>
          <input
            type='tel'
            name='teamLeaderPhoneNumber'
            id='teamLeaderPhoneNumber'
            value={inputValues.teamLeaderPhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='teamLeaderEmailId'>Email</label>
          <input
            type='email'
            name='teamLeaderEmailId'
            id='teamLeaderEmailId'
            value={inputValues.teamLeaderEmailId}
            onChange={handleChange}
          />
        </div>

        <p className='lead'>Team Member Details</p>
        <div className='form-field'>
          <label htmlFor='teamMemberName'>Name</label>
          <input
            type='text'
            name='teamMemberName'
            id='teamMemberName'
            value={inputValues.teamMemberName}
            onChange={handleChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='teamMemberPhoneNumber'>Phone Number</label>
          <input
            type='tel'
            name='teamMemberPhoneNumber'
            id='teamMemberPhoneNumber'
            value={inputValues.teamMemberPhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='teamMemberEmailId'>Email</label>
          <input
            type='email'
            name='teamMemberEmailId'
            id='teamMemberEmailId'
            value={inputValues.teamMemberEmailId}
            onChange={handleChange}
          />
        </div>

        {errorMsg && <p className='error'>{errorMsg}</p>}

        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddTeamForm
