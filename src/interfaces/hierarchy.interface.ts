export interface IEmployee {
  id: string
  label: string
  type: string
  name: string
  phoneNumber: string
  emailId: string
}

export interface ICeo extends IEmployee {
  type: 'root'
  childrens: IHead[]
}

export interface IHead extends IEmployee {
  type: 'head'
  childrens: ITeam[]
}

export interface ITeam {
  id: string
  type: 'team'
  label: string
  under: string
  childrens: ITeamMember[]
}

export interface ITeamMember extends IEmployee {
  type: 'team-member' | 'team-lead'
  under: string
}
