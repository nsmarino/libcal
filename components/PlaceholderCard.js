import styled from '@emotion/styled'

const PlaceholderCardDiv = styled.div`
border-bottom: 1px solid black;
border-top: 1px solid black;
background: whitesmoke;
width: calc(100% / 7);
min-height: 2rem;
@media screen and (max-width: 600px) {
  display: none;
}
`

const PlaceholderCard = () => {
    return (
      <PlaceholderCardDiv>
      </PlaceholderCardDiv>
    )
}

export default PlaceholderCard