import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom'

import { repoLanguages } from '../../constants/helper'
import { useAppDispatch } from '../../store/types'
import { languageFilter, repositoriesSelector } from '../../store/slices/repositoriesSlice'

import { Popup } from '../../components/Popup/Popup'

import './FilterLanguagePopup.scss'

type FilterLanguagePopupProps = {
  /**
   * Function to close the modal in the component
   */
  onClose: () => void
}

const FilterLanguage: FC<FilterLanguagePopupProps> = ({ onClose }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const dispatch = useAppDispatch()
  const { languageFilterValues } = useSelector(repositoriesSelector)

  /**
   * Handles the change event for language filter checkboxes and
   * dispatch an action to update the language filter in the Redux store.
   * @param event - The change event from the checkbox input.
   */
  const handleLanguageFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const language = event.target.name
    const filteredLanguages = event.target.checked
      ? [...selectedLanguages, language]
      : selectedLanguages.filter(l => l !== language)
    setSelectedLanguages(filteredLanguages)
    dispatch(languageFilter({languages: filteredLanguages}))
  }

  useEffect(() => {
    setSelectedLanguages(languageFilterValues)
  }, [])

  return (
    <Popup onClose={onClose}>
      <section className='Filter-language'>
        <h2 className='Filter-language__title'>Filter by Language</h2>
        <article className='Filter-language__content'>
          {repoLanguages
            .map(language =>
              <div key={language} className='Filter-language__content-option'>
                <input
                  id={language}
                  name={language}
                  checked={selectedLanguages.includes(language)}
                  type='checkbox'
                  className='Filter-language__content-option--input'
                  onChange={handleLanguageFilterChange}
                />
                <label className='Filter-language__content-option--label' htmlFor={language}>{language}</label>
              </div>
            )
          }
        </article>
      </section>
    </Popup>
  )
}

export const FilterLanguagePopup: FC<FilterLanguagePopupProps> = ({onClose}) => {
  const container = document.body

  return ReactDOM.createPortal(<FilterLanguage onClose={onClose}/>, container)
}
