import { useQuery } from '@tanstack/react-query'
import { getUserQuery } from '~/api/queries/get-user.query'
import { Avatar, AvatarImage } from '~/components/ui/avatar'

type Props = {
  userId: string
  points: number
}

export const QuizUser = ({ userId, points }: Props) => {
  const { data: user } = useQuery({
    queryKey: ['get-user', userId],
    queryFn: ({ queryKey: [_, userId] }) => getUserQuery(userId!)
  })

  if (user) {
    return (
      <div className="flex w-full items-center justify-between gap-2 rounded-lg border bg-card p-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={'/assets/'.concat(user.avatar).concat('.jpg')} />
          </Avatar>

          {user.username}
        </div>

        <span className="font-semibold text-primary">{points} pts</span>
      </div>
    )
  }
}
