export interface FieldViewerProps {
    value?: any
    hasError?: boolean
    className?: string
    label?: string
  }
  
  const FieldViewer = (props: FieldViewerProps) => {
    return (
      <div className={`w-full ${props.className}`}>
        <div className="text-sm text-label  font-normal uppercase">
          {props.label}
        </div>
        <div
          className={
            'w-full px-3 py-2 rounded-lg border focus:border-secondary focus:outline-none focus:border-secondary min-h-[40px]' +
            (props.hasError ? ' border-error' : ' border-grey-500')
          }
        >
          {props.value}
        </div>
      </div>
    )
  }
  
  export default FieldViewer