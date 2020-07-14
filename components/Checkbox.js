import { useState } from 'react'

const Checkbox = ({ name, label, handleChange, checked=false }) => {

    return (
        <label htmlFor={label}>
          <input
            type="checkbox" 
            id={name} 
            name={name} 
            onChange={handleChange} 
            checked={checked}
          />
          {label}
        </label>
    )
}

const CheckboxContainer = ({ checkboxes, checkedItems, setCheckedItems }) => {
  const handleChange = (event) => {
    setCheckedItems({...checkedItems, [event.target.name]: event.target.checked}) // brackets indicate computed property name
  }

  const showCheckboxes = () => checkboxes.map(item => (
    <Checkbox 
      key={item.key} 
      name={item.name} 
      label={item.label}
      checked={checkedItems[item.name]}
      handleChange={handleChange}
    />
  ))

  return (
      <div>
        {showCheckboxes()}
      </div>
  )
}

export default CheckboxContainer