import styled from '@emotion/styled'

const SegmentedButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin-top: 2rem;
  height: 2rem;
  margin-bottom: 2rem;
  label:first-of-type {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
    }

  label:last-of-type {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
      }

  label {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem;
      text-align: center;
      border: 1px solid black;
      height: 2.25rem;
  }
  input[type="radio"] {
    position: fixed;
    opacity: 0;
    pointer-events: none;
  }  
  .selected {
    background: black;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    transition: transform 100ms ease;
  }
`

const SegmentedButtons = ({children}) => {
    return (
        <SegmentedButtonsDiv>
          {children}
        </SegmentedButtonsDiv>
    )
}

export default SegmentedButtons