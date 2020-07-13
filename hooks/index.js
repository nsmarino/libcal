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
        inputProps,
        reset
    }
}

export const useHTMLSelect = (defaultValue='') => {
    const [value, setValue] = useState(defaultValue)
    // if (type==="date") setValue(new Date())
    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = (event) => {
        setValue(defaultValue)
    }
    
    const inputProps = { value, onChange}
    return {
        inputProps,
        reset
    }
}

export const useBoolean = (defaultValue) => {
    const [value, setValue] = useState(defaultValue)

    const toggle = () => {
        setValue(!value)
    }

    const reset = () => {
        setValue(defaultValue)
    }
    
    return {
        value,
        toggle,
        reset
    }
}