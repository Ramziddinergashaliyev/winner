import { useState } from "react"

export const useGetValue = (initalState) => {
    const [formData, setFormData] = useState(initalState)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return { formData, setFormData, handleChange }
}