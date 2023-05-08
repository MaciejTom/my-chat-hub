import {drawColor} from '../../utils/drawColor'
interface AvatarProps {
  userId: string,
  username: string,
  online: boolean
}
export function Avatar({ userId, username, online }: AvatarProps) {
  const avatarColor = drawColor(userId)
  return (
    <div className={"w-8 h-8 relative rounded-full flex items-center " + avatarColor}>
      <div className="text-center w-full opacity-70">{username[0]}</div>
      {online && (
        <div data-testid="online-user" className="absolute w-3 h-3 bg-green-300 bottom-0 right-0 rounded-full border border-white"></div>
      )}
      {!online && (
        <div data-testid="offline-user" className="absolute w-3 h-3 bg-gray-400 bottom-0 right-0 rounded-full border border-white"></div>
      )}
    </div>
  );
}
