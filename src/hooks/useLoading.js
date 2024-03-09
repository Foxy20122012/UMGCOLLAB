import { useContext } from "react"
import { LoadingContext } from "../plugins/LoadingContext"

const useLoading = () => {
  const loading = useContext(LoadingContext)
  return loading
}

export default useLoading