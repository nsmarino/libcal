import styled from '@emotion/styled'
const StyledBlockCheckBox = styled.div`
padding: 0.25rem;
label {
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    }
label:hover {
  background: white;
  color: black;
}
input {
    display: none;
}
.checked, .checked:hover {
  background: black;
  color: white;
}



`
const BlockCheckBox = ({name, label, register, checked}) => {

  return (
    <StyledBlockCheckBox>
      <label htmlFor={name} className={ checked ? 'checked' : ''}>
        <input type="checkbox" name={name} id={name} ref={register} /> {label}</label>
    </StyledBlockCheckBox>
  )
}
  
export default BlockCheckBox