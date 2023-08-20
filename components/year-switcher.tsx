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

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface YearSwitcherProps extends PopoverTriggerProps {
  years: string[],
  currentYear: string,
}

export default function YearSwitcher({ years, currentYear, className }: YearSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewYearDialog, setShowNewYearDialog] = React.useState(false)

  return (
    <Dialog open={showNewYearDialog} onOpenChange={setShowNewYearDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            {years.filter((year: any) => year === currentYear)[0]}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Søk etter år..." />
              <CommandEmpty>Ingen resultat for dette året</CommandEmpty>
              <CommandGroup heading='Andre år'>
                {years.filter((year: any) => year != currentYear).map((year: any) => (
                  <CommandItem
                    key={year}
                    onSelect={() => {
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <Link className='flex' href={`/leaderboard/${year}`}>
                      {year}
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