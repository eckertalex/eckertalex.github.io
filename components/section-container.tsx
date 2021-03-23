type SectionContainerProps = {
  children: React.ReactNode
}

export function SectionContainer(props: SectionContainerProps) {
  const {children} = props
  return <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>
}
