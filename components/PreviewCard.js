import styled from '@emotion/styled'
import moment from 'moment'

const PreviewCardDiv = styled.div`
  border: 1px solid black;
  background: white;
  width: calc(100% / 7);
  height: 3rem;

  h3 {
    font-size: 90%;
  }

`

const Dot = styled.div`
  background-color: grey;
  margin: 0 auto;
  width:100%;
  height: 25%;
`
const DayCard = ({ day, month, event }) => {
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  const dayMoment = moment(`${month.year}-${zeroPad(month.number+1,2)}-${zeroPad(day,2)}`)
  const color = moment().isSame(dayMoment, 'day') ? '#AFD9AF' : 'white'
  
  return (
    <PreviewCardDiv style={{backgroundColor: color }}>
      <h3>{day}</h3>
      {event && <Dot />} 
    </PreviewCardDiv>
  )
}

export default DayCard