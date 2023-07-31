import { cn } from "@/lib/utils"
import { ActiveLink } from './active-link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { draftMode } from 'next/headers'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

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
        href="matches"
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
      <ActiveLink
        href="/studio"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Studio
      </ActiveLink>
      <UserNav />
    </nav>
  )
}
function UserNav() {
  const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN! } : undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="end" asChild>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {preview && (
              <a
                href="/api/disable-draft"
              >
                Stop previewing drafts
              </a>
            )}
            {!preview && (
              <>
                <a
                  href="/api/draft"
                >
                  Preview drafts
                </a>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
