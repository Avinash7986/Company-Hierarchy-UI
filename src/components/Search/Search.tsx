import React, { ChangeEvent, useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useIsMounted from '../../hooks/useIsMounted'
import './search.css'
import SearchItem from './SearchItem'

interface ISearch {
  isOpen: boolean
  allData: any
}

export interface IItem {
  id: string
  label: string
  type: string
  name: string
  phoneNumber: string
  emailId: string
  under?: string
}

const Search = ({ isOpen, allData }: ISearch) => {
  const [filterItems, setFilterItems] = useState<IItem[]>([])
  const [searchList, setSearchList] = useState<IItem[]>([])
  const [query, setQuery] = useState('')
  const debouncedValue = useDebounce<string>(query, 100)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (isOpen) {
      const getMembers = (members: any[]): any => {
        let children: any = []

        return members
          .map((mem: any) => {
            const m = { ...mem }
            if (m.childrens && m.childrens.length) {
              children = [...children, ...m.childrens]
            }
            delete m.childrens
            if (m.type !== 'team') {
              return m
            }
          })
          .concat(children.length ? getMembers(children) : children)
      }

      if (isMounted()) {
        setSearchList(getMembers(allData).filter(Boolean))
      }
    }
  }, [isOpen])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    setQuery(val)
  }

  useEffect(() => {
    const val = debouncedValue
    if (val.length > 0 && searchList.length > 0) {
      const items = searchList.filter((item: IItem) => {
        const regex = new RegExp(`${val}`, 'gi')
        if (/^[0-9]+$/.test(val)) {
          return item.phoneNumber.match(regex)
        }
        return item.name.match(regex) || item.emailId.match(regex)
      })
      setFilterItems(items)
    } else {
      setFilterItems([])
    }
  }, [debouncedValue])

  return (
    <div className='search__wrapper'>
      <div className='form-field'>
        <input
          autoComplete='off'
          placeholder='search...'
          type='search'
          name='query'
          id='query'
          value={query}
          onChange={handleChange}
        />
        <p className='search-label'>
          Search Employee By Name, Phone Number, and Email ID.
        </p>
      </div>

      {searchList.length === 0 && <p>Loading...</p>}

      {searchList.length > 0 &&
        filterItems.length === 0 &&
        query.length > 0 && <p className='list__info'>No employee found!!</p>}

      {filterItems.length > 0 && (
        <div className='list__wrapper'>
          <p className='list__info'>Employee List</p>
          <ul role='list'>
            {filterItems.map((item: IItem) => (
              <li key={item.id}>
                <SearchItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Search
