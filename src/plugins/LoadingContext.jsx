'use client'
import { createContext, useContext, useState } from "react"
import presets from "../utils/globalPresets"
import LoadingSpinner from "../components/general/Loading/Loading"
export const LoadingContext = createContext()

const 
LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const loadingWrapper = {
    loading: loading,
    setLoading: setLoading,
    start: () => { setLoading(true) },
    stop: () => { setLoading(false) }
  }

  return (
    <LoadingContext.Provider value={ loadingWrapper }>
      { children }
      <LoadingSpinner loading={loading} image={presets.images.imageLoader} background={'backgroundLoader'} color={'colorLoader'} />
    </LoadingContext.Provider>
  )
}

export default LoadingProvider