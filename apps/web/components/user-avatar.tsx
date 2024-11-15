import { Avatar, AvatarImage } from '~/components/ui/avatar'

import { User } from '~/types/auth.types'

type Props = {
  user: User
}

export const UserAvatar = ({ user }: Props) => {
  return (
    <div className="text-foreground flex w-fit items-center justify-center gap-3 text-base">
      <Avatar className="h-12 w-12">
        <AvatarImage src={'/assets/' + user.avatar + '.jpg'} alt="@shadcn" />
      </Avatar>

      {user.username}
    </div>
  )
}
