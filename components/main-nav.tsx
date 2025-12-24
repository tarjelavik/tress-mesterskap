import { cn } from "@/components/lib/utils"
import { ActiveLink } from './active-link'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <ActiveLink
        href="/players"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Spillere
      </ActiveLink>
      <ActiveLink
        href="/leaderboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Resultatliste
      </ActiveLink>
      <ActiveLink
        href="/matches"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Spill
      </ActiveLink>
      <ActiveLink
        href="/tournaments"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Turneringer
      </ActiveLink>
    </nav>
  )
}
