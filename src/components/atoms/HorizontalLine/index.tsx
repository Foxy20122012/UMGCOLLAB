interface HorizontalLineProps {
  className?: string
  bold?: boolean
}

const HorizontalLine = (props: HorizontalLineProps) => {
  return (
    <hr
      className={`w-full h-[1px] ${
        props.bold ? 'border-black' : 'border-disabled '
      }  ${props.className}`}
    />
  )
}

export default HorizontalLine
