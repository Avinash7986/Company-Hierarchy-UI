import Card from '../../components/Card/Card'
import { ICeo } from '../../interfaces/hierarchy.interface'

import './companyHierarchy.css'

interface ICompanyHierarchy {
  data: ICeo[]
}

const CompanyHierarchy = ({ data }: ICompanyHierarchy) => {
  return (
    <>
      {data.map((item: any) => {
        if (item.type === 'team-member') {
          return <Card key={item.id} item={item}></Card>
        }
        return (
          <Card key={item.id} item={item}>
            {item?.childrens && <CompanyHierarchy data={item.childrens} />}
          </Card>
        )
      })}
    </>
  )
}

export default CompanyHierarchy
