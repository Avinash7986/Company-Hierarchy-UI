import CompanyHierarchy from './features/companyHierarchy/CompanyHieratchy'
import { useAppSelector } from './app/hooks'
import { getAllData } from './features/companyHierarchy/companyHierarchySlice'
import TopAction from './components/TopAction/TopAction'

import './app.css'
import { useEffect } from 'react'

const App = () => {
  const data = useAppSelector(getAllData)

  useEffect(() => {
    localStorage.setItem('company-data', JSON.stringify(data))
  }, [data])

  return (
    <div className='wrapper'>
      <h1>Company Hierarchy</h1>
      <TopAction />
      <CompanyHierarchy data={data} />
    </div>
  )
}

export default App
