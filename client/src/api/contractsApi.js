import api from './axiosInstance'

export const getDashboard = async () => {
    const { data } = await api.get("/api/document/dashboard");
    return data.data;
};
export const uploadContract = async (file) => {
    const { data } = await api.post('/api/document/upload', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return data
}

export const chatapi = async (contractId, question) => {
    const response = await api.post(
        `/api/document/contracts/${contractId}/chat`,
        {
            question: question,
        }
    );

    return response.data;
};

export const getcontracts = async () => {
    const { data } = await api.get("/api/document/contracts")
    return data
}

export const analyzeContract = async (id) => {
    const { data } = await api.get(`/api/document/analyze/${id}`)
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
