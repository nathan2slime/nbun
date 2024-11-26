import Image from 'next/image'
import { HTMLAttributes } from 'react'

import { cn } from '~/lib/utils'

type Props = {
  title: string
  src: string
  active: boolean
} & HTMLAttributes<HTMLDivElement>

export const AvatarButton = ({ title, src, active, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(
        'h-[45px] w-[45px] cursor-pointer rounded-full',
        active && 'ring-2 ring-primary'
      )}
    >
      <Image
        className="h-[45px] w-[45px] rounded-full object-cover"
        src={src}
        alt={title}
        width={60}
        height={60}
      />
    </div>
  )
}
