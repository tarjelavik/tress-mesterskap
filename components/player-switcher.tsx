"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity.image'
import player from '@/sanity/schemas/documents/player'
import initials from 'initials'
import { initial } from 'lodash'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface PlayersSwitcherProps extends PopoverTriggerProps {
  players: any,
  currentPlayer: string,
}

export default function PlayerSwitcher({ players, currentPlayer, className }: PlayersSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={players.filter((player: any) => player._id === currentPlayer)[0].mainRepresentation
                  ? urlForImage(players.filter((player: any) => player._id === currentPlayer)[0].mainRepresentation).width(25).height(25).url()
                  : 'https://via.placeholder.com/25'}
                alt={players.filter((player: any) => player._id === currentPlayer)[0].name}
              />
              <AvatarFallback>{initials(players.filter((player: any) => player._id === currentPlayer)[0].name)}</AvatarFallback>
            </Avatar>
            {players.filter((player: any) => player._id === currentPlayer)[0].name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Søk etter spiller..." />
              <CommandEmpty>Ingen spillere funnet</CommandEmpty>
              <CommandGroup heading='Andre spillere'>
                {players.filter((player: any) => player._id != currentPlayer).map((player: any) => (
                  <CommandItem
                    key={player.name}
                    onSelect={() => {
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <Link className='flex' href={`/players/${player._id}`}>
                      <Avatar className="mr-2 h-5 w-5">

                        {player.mainRepresentation && (
                          <AvatarImage
                            src={urlForImage(player.mainRepresentation).width(25).height(25).url()}
                            alt={player.name}
                            className="grayscale"
                          />
                        )}
                        <AvatarFallback>{initials(player.name)}</AvatarFallback>
                      </Avatar>
                      {player.name}
                    </Link>

                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  )
}