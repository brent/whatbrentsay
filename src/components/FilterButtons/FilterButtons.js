import React from "react"
import * as styles from './FilterButtons.module.css'

const FilterButtons = ({
  postTypes,
  filters,
  updateFilters,
}) => {
  const buttonLabels = {
    'feature': 'features',
    'long': 'articles',
    'short': 'bits',
  }

  const handleFilterButtonClick = (filterButton) => {
    const result = filters.findIndex(filter => filter === filterButton)

    if (result !== -1) {
      updateFilters([
        ...filters.map(filter => {
          return filter !== filterButton ? filter : null
        })
          .filter(val => val != null)
      ])
    } else {
      updateFilters([
        ...filters,
        filterButton,
      ])
    }
  }

  const applyFilterButtonStyle = (type, filters) => {
    let buttonStyles = `${styles.filterButton}`

    filters.forEach(filter => {
      if (filter === type) buttonStyles = `${buttonStyles} ${styles.filterButton__active}`
    });

    return buttonStyles
  }

  const renderButtons = () => (
    postTypes.map((type, index) => (
      <li className={styles.filterButtons__listItem} key={index}>
        <button
          className={applyFilterButtonStyle(type, filters)}
          onClick={() => handleFilterButtonClick(type)}
        >{buttonLabels[type]}</button>
      </li>
    ))
  )

  return (
    <ul className={styles.filterButtons}>{renderButtons()}</ul>
  )
}

export default FilterButtons
