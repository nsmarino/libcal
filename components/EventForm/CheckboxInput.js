import styled from '@emotion/styled'
const StyledCheckBox = styled.div`
padding: 0.5rem;
display: flex;
justify-content: center;
:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  transition: transform 100ms ease;
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