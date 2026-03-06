import { cn } from '@/utils/cn'

export const Container = ({ className, as: Tag = 'div', children }) => {
  const Component = Tag

  return <Component className={cn('container relative z-10', className)}>{children}</Component>
}
