import toast from 'react-hot-toast'

export const notifySuccess = (message) => toast.success(message)
export const notifyError = (message) => toast.error(message)
