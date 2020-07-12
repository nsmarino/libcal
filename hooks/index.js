import { useState } from 'react'

export const useField = (type, defaultValue='') => {
    const [value, setValue] = useState(defaultValue)
    // if (type==="date") setValue(new Date())
    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = (event) => {
        setValue('')
    }
    const inputProps = {type, value, onChange}
    return {
        // type,
        // value,
        // onChange,
        inputProps,
        reset
    }
}