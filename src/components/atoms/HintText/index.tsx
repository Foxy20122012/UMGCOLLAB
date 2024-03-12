interface HintTextProps {
  text: string
  className?: string
}

const HintText = (props: HintTextProps) => {
  return (
    <div
      className={[
        'text-black text-justify  text-sm font-medium tracking-tight uppercase',
        props.className,
      ].join(' ')}
    >
      {props.text}
    </div>
  )
}

export default HintText
