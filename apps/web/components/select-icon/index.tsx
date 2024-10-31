import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface props extends HTMLAttributes<HTMLDivElement> {
  name: string
  img: string
  selected: boolean
}

export const SelectIcon = ({ name, img, selected, ...rest }: props) => {
  return (
    <div
      {...rest}
      className={`rounded-full ${selected && 'ring-4 ring-amber-400'}`}
    >
      <Image
        className={'w-[60px]'}
        src={img}
        alt={name}
        width={1000}
        height={100}
      />
    </div>
  )
}
