import React from 'react'
import styled from '@emotion/styled'

const StyledSelect = styled.select`
  font-family: Georgia;
/*  background: #AFD9AF;*/
  padding: 0.25rem;
  border: 1px solid grey;
  :hover {
    transform: translateY(-2px) 
  }
`

const OptionSelect = ({ label, name, options, register}) => {
  const displayOptions = () => {
    return options.map(option =>{
      return <option value={option.value} key={option.value}>{option.displayText}</option>    
    })
  }

  return (
  <label style={{border: 'none'}}>{label}
    <StyledSelect 
      name={name} 
      ref={register({ required: true })}
    >
      {displayOptions()}
    </StyledSelect>
  </label>
  )
}

export default OptionSelect