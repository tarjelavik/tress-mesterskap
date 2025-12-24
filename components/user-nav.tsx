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
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { draftMode } from 'next/headers'
import Link from 'next/link'

export async function UserNav() {
  const { isEnabled } = await draftMode()
  const preview = isEnabled ? { token: process.env.SANITY_API_READ_TOKEN! } : undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="self-end" asChild>
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
          <DropdownMenuItem>
            <Link
              href="/studio"
              target="_blank"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Studio
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
