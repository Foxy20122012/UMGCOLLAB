interface TitleProps {
  text: string
  className?: string
  mandatoryLabel?: boolean
}

const SubTitle = (props: TitleProps) => {
  return (
    <div
      className={[
        'text-black text-xl font-semibold leading-normal tracking-tight',
        props.className,
      ].join(' ')}
    >
      {props.text}
      {props.mandatoryLabel ? ' * ' : ''}
    </div>
  )
}

export default SubTitle
