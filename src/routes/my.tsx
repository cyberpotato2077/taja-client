import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/my"!</div>
}
