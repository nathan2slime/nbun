import { Zap } from 'lucide-react'

type Props = {
  value: number
}

export const UserXp = ({ value }: Props) => {
  return (
    <div className="flex h-fit items-center justify-center gap-1 rounded-lg bg-secondary p-2 text-base text-secondary-foreground">
      <Zap width={18} strokeWidth={1.6} />
      {value}
    </div>
  )
}
