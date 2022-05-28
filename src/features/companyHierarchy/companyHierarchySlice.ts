import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ICeo } from '../../interfaces/hierarchy.interface'

interface InitialState {
  data: ICeo[]
}

const initalData: ICeo = {
  id: '0',
  label: 'CEO',
  type: 'root',
  name: 'Avinash Kumar',
  phoneNumber: '1231235678',
  emailId: 'ceo@gmail.com',
  childrens: [
    {
      id: '0-0',
      type: 'head',
      label: 'Head of staff/HR',
      name: 'Sachin',
      phoneNumber: '8831235678',
      emailId: 'sachin@gmail.com',
      childrens: [],
    },
    {
      id: '0-1',
      type: 'head',
      label: 'Head of engineering',
      name: 'Smith',
      phoneNumber: '2311235678',
      emailId: 'smith@gmail.com',
      childrens: [],
    },
    {
      id: '0-2',
      type: 'head',
      label: 'Head of design',
      name: 'Jhonty',
      phoneNumber: '3451235678',
      emailId: 'jhonty@gmail.com',
      childrens: [],
    },
  ],
}

const initialState: InitialState = {
  data: localStorage.getItem('company-data')
    ? JSON.parse(localStorage.getItem('company-data') as string)
    : [initalData],
}

const companyHierarchySlice = createSlice({
  name: 'companyHierarchy',
  initialState,
  reducers: {
    addTeam: (state, action: any) => {
      const {
        id,
        teamLabel,
        teamLeaderName,
        teamLeaderPhoneNumber,
        teamLeaderEmailId,
        teamMemberName,
        teamMemberPhoneNumber,
        teamMemberEmailId,
      } = action.payload

      const parent = state.data[0]
      const child = parent.childrens.find((item) => item.id === id)
      if (child) {
        const childId = `${id}-${child.childrens.length}`

        child.childrens.push({
          id: childId,
          label: teamLabel,
          type: 'team',
          under: child.label,
          childrens: [
            {
              id: `${childId}-0`,
              type: 'team-lead',
              label: 'Team Leader',
              phoneNumber: `${teamLeaderPhoneNumber}`,
              emailId: `${teamLeaderEmailId}`,
              name: `${teamLeaderName}`,
              under: `${child.label}/${teamLabel}`,
            },
            {
              id: `${childId}-1`,
              type: 'team-member',
              label: 'Team Member',
              phoneNumber: `${teamMemberPhoneNumber}`,
              emailId: `${teamMemberEmailId}`,
              name: `${teamMemberName}`,
              under: `${child.label}/${teamLabel}`,
            },
          ],
        })
      }
    },

    addTeamMember: (state, action: any) => {
      const { id, phoneNumber, name, emailId } = action.payload

      const parentId = id.split('-').slice(0, -1).join('-')

      const parent = state.data[0].childrens.find(
        (item) => item.id === parentId
      )

      if (parent) {
        const child = parent?.childrens.find((item) => item.id === id)

        if (child) {
          const childLength = child.childrens.length
          const lastChildId = child.childrens[childLength - 1].id
            .split('-')
            .slice(-1)
            .join('')

          child.childrens.push({
            id: `${id}-${+lastChildId + 1}`,
            type: 'team-member',
            label: 'Team Member',
            under: `${child.under}/${child.label}`,
            phoneNumber,
            emailId,
            name,
          })
        }
      }
    },

    removeTeamMember: (state, action: any) => {
      const { id } = action.payload
      const grandParentId = id.split('-').slice(0, 2).join('-')
      const grandParent = state.data[0].childrens.find(
        (item) => item.id === grandParentId
      )
      if (grandParent) {
        const parentId = id.split('-').slice(0, -1).join('-')

        const parent = grandParent.childrens.find(
          (item) => item.id === parentId
        )
        if (parent) {
          const childIndex = parent.childrens.findIndex(
            (item) => item.id === id
          )
          if (childIndex !== -1) {
            parent.childrens.splice(childIndex, 1)
          }
        }
      }
    },

    updateTeamName: (state, action: any) => {
      const { id, label } = action.payload

      const grandParentId = id.split('-').slice(0, 2).join('-')
      const grandParent = state.data[0].childrens.find(
        (item) => item.id === grandParentId
      )

      if (grandParent) {
        const child = grandParent.childrens.find((item) => item.id === id)

        if (child) {
          child.label = label
        }
      }
    },

    updateEmpInfo: (state, action: any) => {
      const { id, type, name, phoneNumber, emailId } = action.payload

      if (type === 'root') {
        state.data[0].name = name
        state.data[0].phoneNumber = phoneNumber
        state.data[0].emailId = emailId
      }

      if (type === 'head') {
        const parent = state.data[0]
        const child = parent.childrens.find((item) => item.id === id)

        if (child) {
          child.name = name
          child.phoneNumber = phoneNumber
          child.emailId = emailId
        }
      }

      if (type === 'team-lead' || type === 'team-member') {
        const grandParentId = id.split('-').slice(0, 2).join('-')
        const grandParent = state.data[0].childrens.find(
          (item) => item.id === grandParentId
        )

        if (grandParent) {
          const parentId = id.split('-').slice(0, -1).join('-')

          const parent = grandParent.childrens.find(
            (item) => item.id === parentId
          )

          if (parent) {
            const child = parent.childrens.find((item) => item.id === id)
            if (child) {
              child.name = name
              child.phoneNumber = phoneNumber
              child.emailId = emailId
            }
          }
        }
      }
    },

    moveTeamMember: (state, action) => {
      const { member, currentTeamId, newTeamId } = action.payload
      const grandParentId = member.id.split('-').slice(0, 2).join('-')
      const grandParent = state.data[0].childrens.find(
        (item) => item.id === grandParentId
      )

      if (grandParent) {
        const currentTeam = grandParent.childrens.find(
          (i) => i.id === currentTeamId
        )
        if (currentTeam) {
          const currentMemberIndex = currentTeam.childrens.findIndex(
            (i) => i.id === member.id
          )
          if (currentMemberIndex !== -1) {
            currentTeam.childrens.splice(currentMemberIndex, 1)
          }

          const newTeam = grandParent.childrens.find((i) => i.id === newTeamId)

          if (newTeam) {
            const childLength = newTeam.childrens.length
            const lastChildId = newTeam.childrens[childLength - 1].id
              .split('-')
              .slice(-1)
              .join('')
            newTeam.childrens.push({
              ...member,
              id: `${newTeam.id}-${+lastChildId + 1}`,
            })
          }
        }
      }
    },
  },
})

export const {
  addTeam,
  addTeamMember,
  removeTeamMember,
  updateTeamName,
  updateEmpInfo,
  moveTeamMember,
} = companyHierarchySlice.actions
export const getAllData = (state: RootState) => state.companyHierarchy.data

export const companyHierarchyReducer = companyHierarchySlice.reducer
