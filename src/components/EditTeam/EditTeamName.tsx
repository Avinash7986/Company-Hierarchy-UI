import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { updateTeamName } from '../../features/companyHierarchy/companyHierarchySlice'
import './editTeamName.css'

interface IEditTeamName {
  item: any
  onClose: () => void
}

const EditTeamName = ({ item, onClose }: IEditTeamName) => {
  const dispatch = useAppDispatch()
  const rootChildrens = useAppSelector(
    (state: RootState) => state.companyHierarchy.data[0].childrens
  )
  const [inputValues, setInputValues] = useState({
    label: item.label as string,
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
    const { label } = inputValues
    const isNameChanged = label.toLowerCase() !== item.label.toLowerCase()
    if (label === '') {
      setErrorMsg('Please fill all fields')
      return
    }

    if (isNameChanged) {
      const parentId = item.id.split('-').slice(0, -1).join('-')
      const parent = rootChildrens.find((data) => data.id === parentId)
      const isNameExists = parent?.childrens.findIndex(
        (c) => c.label.toLowerCase() === label.toLowerCase()
      )

      if (isNameExists !== -1) {
        return setErrorMsg(
          'Team name already exists. Please enter a new team name'
        )
      }
    }

    setErrorMsg('')
    if (isNameChanged) {
      dispatch(updateTeamName({ id: item.id, ...inputValues }))
    }

    onClose()
  }

  return (
    <div className='update-wrapper'>
      <h2>Update Team Name</h2>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-field'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='label'
            id='label'
            value={inputValues.label}
            onChange={handleChange}
          />
        </div>

        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditTeamName
