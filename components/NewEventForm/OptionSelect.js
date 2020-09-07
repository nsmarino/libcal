import React from 'react'

const OptionSelect = ({ label, name, options, register}) => {
  const displayOptions = () => {
    return options.map(option =>{
      return <option value={option.value} key={option.value}>{option.displayText}</option>    
    })
  }

  return (
  <label>{label}
    <select 
      name={name} 
      ref={register({ required: true })}
    >
      {displayOptions()}
    </select>
  </label>
  )
}

export default OptionSelect