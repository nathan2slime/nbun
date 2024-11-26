import { AvatarButton } from '~/components/avatar-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { avatars } from '~/lib/avatars'
import { AppChildren } from '~/types'

type Props = AppChildren<{
  avatar: string
  onChange: (avatar: string) => void
}>

export const AvatarsDialog = ({ children, avatar, onChange }: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="w-[90%] max-w-xs rounded-lg">
          <DialogHeader className="text-start">
            <DialogTitle>Personalize-se</DialogTitle>
            <DialogDescription>
              Você consegue mudar depois nas configurações
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-2">
            {avatars.map(currentAvatar => (
              <AvatarButton
                key={`dialog_${currentAvatar}`}
                onClick={() => onChange(currentAvatar)}
                active={currentAvatar === avatar}
                src={'/assets/'.concat(currentAvatar).concat('.jpg')}
                title={currentAvatar}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
