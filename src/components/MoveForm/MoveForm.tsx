import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getAllData,
  moveTeamMember,
} from '../../features/companyHierarchy/companyHierarchySlice'
import './moveForm.css'

interface IMoveForm {
  item: any
  onClose: () => void
}

interface Item {
  id: string
  type: string
  label: string
  under: string
  childrens?: any[]
}

const MoveForm = ({ item, onClose }: IMoveForm) => {
  const allData = useAppSelector(getAllData)
  const dispatch = useAppDispatch()
  const [currentTeam, setCurrentTeam] = useState<Item>()
  const [teamList, setTeamList] = useState<Item[]>([])
  const [selectedTeam, setSelectedTeam] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const handleMove = () => {
      const grandParentId = item.id.split('-').slice(0, 2).join('-')
      const parentId = item.id.split('-').slice(0, -1).join('-')
      const grandParent = allData[0].childrens.find(
        (item) => item.id === grandParentId
      )

      if (grandParent) {
        const currentTeamm = grandParent.childrens.find(
          (i) => i.id === parentId
        )
        if (currentTeamm) {
          const teamList = grandParent.childrens.map((ch) => {
            const { childrens, ...rest } = ch
            return rest
          })
          setCurrentTeam(currentTeamm)
          const teamListCopy = teamList.filter((i) => i.id !== currentTeamm.id)
          if (teamListCopy?.length === 0) {
            setErrorMsg('Please add a new team to move this team member!')
          }
          setTeamList(teamListCopy)
        }
      }
    }
    handleMove()
  }, [])

  const handleClick = () => {
    if (selectedTeam !== '') {
      if (currentTeam?.childrens && currentTeam?.childrens?.length <= 2) {
        return setErrorMsg(
          "You can't  move this member because current team has only one team member. Please add a new team member to move it"
        )
      }
      setErrorMsg('')
      dispatch(
        moveTeamMember({
          member: item,
          currentTeamId: currentTeam?.id,
          newTeamId: selectedTeam,
        })
      )
      onClose()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value)
  }

  return (
    <div className='move'>
      <p className='move__head'>{currentTeam?.under}</p>
      <p className='move__team'>
        Current Team: <span>{currentTeam?.label}</span>
      </p>
      <p className='move__label'>New Team</p>
      <select name='moveTo' id='moveTo' onChange={handleChange}>
        <option value=''>Select New Team...</option>
        {teamList.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <button className='btn' onClick={handleClick}>
        Move
      </button>
    </div>
  )
}

export default MoveForm
