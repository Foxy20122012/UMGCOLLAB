'use client'

import Link from 'next/link'
import FixedSizedImage from '../FixedSizeImage'

const WhatsIcon = require('@/assets/images/social/icon_whatsapp_white.png')

const contact_whatsapp_link = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_LINK
  ? process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_LINK
  : ''

interface Props {
  icon?: any
  backgroundColor?: string
}

const FLoatingButton = (props: Props) => {
  return (
    <Link
      href={contact_whatsapp_link}
      target="_blank"
      className={`
        fixed right-2 bottom-4 p-3 rounded-full shadow-lg shadow-[#00000050]
        ${
          props.backgroundColor
            ? 'bg-[' + props.backgroundColor + ']'
            : 'bg-[#18ca50ff]'
        }
     `}
    >
      <FixedSizedImage
        src={props.icon ? props.icon : WhatsIcon}
        height={38}
        width={38}
      />
    </Link>
  )
}

export default FLoatingButton
