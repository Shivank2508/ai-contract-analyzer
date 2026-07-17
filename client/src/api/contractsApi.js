import api from './axiosInstance'

export const uploadContract = async (file) => {
    const formData = new FormData()
    formData.append('document', file)

    const { data } = await api.post('/api/document/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return data
}

export const getStoredContracts = () => {
    try {
        const saved = localStorage.getItem('contracts')
        return saved ? JSON.parse(saved) : []
    } catch {
        return []
    }
}

export const saveStoredContracts = (contracts) => {
    localStorage.setItem('contracts', JSON.stringify(contracts))
}
