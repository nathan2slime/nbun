import { Zap } from 'lucide-react'

type Props = {
  value: number
}

export const UserXp = ({ value }: Props) => {
  return (
    <div className="bg-secondary text-secondary-foreground flex h-fit items-center justify-center gap-1 rounded-lg p-2 text-lg">
      <Zap width={22} strokeWidth={1.6} />
      {value}
    </div>
  )
}
