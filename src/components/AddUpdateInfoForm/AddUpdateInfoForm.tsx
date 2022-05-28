import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import {
  addTeamMember,
  updateEmpInfo,
} from '../../features/companyHierarchy/companyHierarchySlice'
import { validate } from '../../utils/validate'
import EmployeeForm from '../EmployeeForm/EmployeeForm'
import './addUpdateInfoForm.css'

interface IAddUpdateInfoForm {
  item: any
  addEmp: boolean
  onClose: () => void
}

const AddUpdateInfoForm = ({ item, addEmp, onClose }: IAddUpdateInfoForm) => {
  const dispatch = useAppDispatch()
  const [inputValues, setInputValues] = useState({
    name: addEmp ? '' : item.name,
    phoneNumber: addEmp ? '' : item.phoneNumber,
    emailId: addEmp ? '' : item.emailId,
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
      return setErrorMsg('Please fill all fields')
    }
    const isEmailValid = validate('email', inputValues.emailId)
    if (!isEmailValid) {
      return setErrorMsg('Please enter valid email id')
    }

    const isPhoneNumberValid = validate('phoneNumber', inputValues.phoneNumber)
    if (!isPhoneNumberValid) {
      return setErrorMsg('Please enter valid phone number')
    }
    if (addEmp) {
      dispatch(addTeamMember({ id: item.id, ...inputValues }))
    } else {
      dispatch(updateEmpInfo({ id: item.id, type: item.type, ...inputValues }))
    }

    onClose()
  }

  return (
    <div className='update-wrapper'>
      <h2>{addEmp ? 'Add New Team Memeber' : 'Update Employee Information'}</h2>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <EmployeeForm
        name={inputValues.name}
        phoneNumber={inputValues.phoneNumber}
        emailId={inputValues.emailId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default AddUpdateInfoForm
