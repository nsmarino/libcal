import styled from '@emotion/styled'

const StyledTimeInput = styled.div`
  display: flex;
  background: white;
  align-items: center;
  margin-left: 0.5rem;
  padding-left: 0.25rem;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  border: 1px solid grey;

  label {
    margin-right: 0.25rem;
  }
  input {
    font-size: 1rem;
    border: none;
    flex: 1 0 auto;
    padding: 0.25rem;
    border: none;
    appearance: none;
    -webkit-appearance: none;
    color: black;
    font-size: 1rem;
    background:white;
    display: inline-block !important;
    visibility: visible !important;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 1rem;
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