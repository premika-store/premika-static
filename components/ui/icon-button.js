import { cn } from '@/lib/utils'

const IconButton = ({
  className,
  icon,
  onClick
}) => {
  return (
  <button
    onClick={onClick}
    className={cn('rounded-full felx justify-center items-center bg-white shadow-md p-2 hover:scale-110 transition', className)}
  >
    {icon}
  </button>
  )
}

export default IconButton
