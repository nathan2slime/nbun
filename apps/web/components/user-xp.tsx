import { Zap } from 'lucide-react'

type Props = {
  value: number
}

export const UserXp = ({ value }: Props) => {
  return (
    <div className="bg-secondary text-secondary-foreground flex h-fit items-center justify-center gap-1 rounded-lg p-2 text-base">
      <Zap width={18} strokeWidth={1.6} />
      {value}
    </div>
  )
}
