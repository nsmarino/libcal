import styled from '@emotion/styled'

const SegmentedButtonsDiv = styled.div`
  display: flex;
  font-family: Arial;
  font-size: 1.5rem;

  label:first-of-type {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
    }

  label:last-of-type {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
      }

  label {
      display: block;
      text-align: center;
      border: 1px solid black;
      width: 6rem;
  }
  input[type="radio"] {
    position: fixed;
    opacity: 0;
    pointer-events: none;
  }  
  .selected {
    background: black;
    color: yellow;
    transform: translateY(-2px);
    box-shadow: 0px 3px 5px lightgrey;
    transition: transform 100ms ease;
  }
`

const SegmentedButtons = ({options, register, watch}) => {
  const selection = watch("recurrenceType")

  const buttons = () => {
      return options.map(option => {

        return <label className={option.value===selection ? "selected" : ''} key={option.value}>
          <input
            ref={register} 
            type="radio" 
            id={option.value} 
            name={option.set}
            value={option.value} 
           />{option.label}
        </label>
  })
    }

    return (
        <SegmentedButtonsDiv>
          {buttons()}
        </SegmentedButtonsDiv>
    )
}

export default SegmentedButtons