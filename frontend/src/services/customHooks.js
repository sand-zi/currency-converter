import { useState, useEffect } from 'react'


export const useForm = (initialState, cb = () => { }) => {
    const [form, setForm] = useState(initialState)
    useEffect(() => { cb(form) }, [cb, form])
  
    return [
      form,
      function (ev) {
        const name = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        setForm(prevForm => ({
          ...prevForm,
          [name]: value
        }))
      },
      function (value) {
        setForm(value)
      }
    ]
  }