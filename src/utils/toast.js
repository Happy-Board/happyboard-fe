import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const notify = (type, message) => {
    switch (type) {
      case 'success':
        toast.success(message, {
          autoClose: 1000
        })
        break
      case 'warning':
        toast.warning(message, {
          autoClose: 1000
        })
        break
      case 'error':
        toast.error(message, {
          autoClose: 1500
        })
        break
      case 'info':
        toast.info(message, {
          autoClose: 1000
        })
        break
  
      default:
        break
    }
  }