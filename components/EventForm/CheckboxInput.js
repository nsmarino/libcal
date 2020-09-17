import styled from '@emotion/styled'
const StyledCheckBox = styled.div`
padding: 0.5rem;
:hover {
  background: lightgrey;
}
`
const CheckboxInput = ({name, label, register}) => {


  return (
    <StyledCheckBox>
      <label>
        <input type="checkbox" name={name} ref={register} /> {label}</label>
    </StyledCheckBox>
  )
}
  
export default CheckboxInput