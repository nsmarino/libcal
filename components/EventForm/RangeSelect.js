const RangeSelect = ({ register, name, min, max }) => {
    const range = () => {
        const arr = []
        for (let i=min;i<=max;i++) {
            arr.push(i)
        }
        return arr.map(num => 
          <option value={num} key={num}>{num}</option>
        )
 
    }

    return (
      <select name={name} ref={register({ required: true })} style={{margin: '0.25rem'}}>
        {range()}
      </select>
    )
}

export default RangeSelect