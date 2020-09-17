import styled from '@emotion/styled'

const StyledTimeInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial;
  input {
    flex: 1 0 auto;
    font-family: Arial;
    font-size: 1rem;
    border: none;
    flex: 1 0 auto;
    padding: 0.25rem;
    border: none;
    appearance: none;
    -webkit-appearance: none;
    color: grey;
    font-size: 1rem;
    background:white;
    display: inline-block !important;
    visibility: visible !important;
  }
  
`

const TimeInput = ({name, label, register, errors}) => {
    return (
    <StyledTimeInput>
      <label htmlFor={name}>{label}</label>
      <input type="time" name={name} ref={register({ required: true })} />
      {errors[name] && <p>This field is required</p>}
    </StyledTimeInput>
    )
  }
  
  export default TimeInput