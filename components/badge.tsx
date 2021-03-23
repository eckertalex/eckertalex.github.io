type BadgeProps = {
  children: React.ReactNode
}

export function Badge(props: BadgeProps) {
  const {children} = props

  return (
    <span className="inline-block bg-pink-200 text-pink-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide mx-1">
      {children}
    </span>
  )
}
