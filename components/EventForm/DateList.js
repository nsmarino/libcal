import { useState } from 'react'
import styled from '@emotion/styled'

import DateListItem from './DateListItem'

const StyledUl = styled.ul`
margin: 0;
padding: 0;
list-style-type: none;
font-size: 0.75rem;
text-transform: uppercase;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
flex: 1 1 auto;
`

const StyledPara = styled.p`
margin: 0;
padding: 0;
font-size: 0.75rem;
text-transform: uppercase;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
flex: 1 1 auto;
text-decoration: underline;
:hover {
  cursor: pointer;
  font-style: italic;
}
`

const DateList = ({ dates }) => {
  const [listVis, setListVis] = useState(false)

  const displayDates = () => {
    return dates.map(date => <DateListItem date={date} key={`${date.day}${date.month}${date.year}`}/>)
  }

  return (
  <>
  { listVis ?
    <>
    <StyledUl>
      {displayDates()}
    </StyledUl>
    <StyledPara onClick={() => setListVis(false)}>Hide dates</StyledPara>
    </>
  :
    <StyledPara onClick={() => setListVis(true)}>Show all dates</StyledPara>
  }
  </>
  )
}

export default DateList