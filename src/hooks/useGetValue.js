import { useState } from "react"

export const useGetValue = (initialState) => {
    const [formData, setFromData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFromData((prev) => ({ ...prev, [name]: value }))
    }

    return { formData, setFromData, handleChange }
}