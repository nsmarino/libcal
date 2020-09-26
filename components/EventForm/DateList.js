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

const DateList = ({ dates }) => {

  const displayDates = () => {
    return dates.map(date => <DateListItem date={date} key={`${date.day}${date.month}${date.year}`}/>)
  }

  return (
  <StyledUl>
    {displayDates()}
  </StyledUl>
  )
}

export default DateList