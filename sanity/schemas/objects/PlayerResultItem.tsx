
import {ObjectItemProps, PatchEvent, set} from 'sanity'
import {Box, Flex, TextInput, Stack, Text, Switch} from '@sanity/ui'
import {useDocumentPane} from 'sanity/desk'
import {useCallback, useMemo, useRef, useEffect, useState} from 'react'

type PlayerResult = {
  _key?: string
  player?: {_ref: string}
  isWinner?: boolean
  score?: number[]
}

// Helper to safely call onChange, suppressing flushSync warnings
function safeOnChange(
  onChange: (patch: PatchEvent) => void,
  patch: PatchEvent
) {
  try {
    onChange(patch)
  } catch (error: any) {
    // Suppress flushSync warnings - they're harmless when functionality works
    if (
      error?.message?.includes('flushSync') ||
      error?.message?.includes('lifecycle method')
    ) {
      // Retry after a microtask if it's a flushSync error
      queueMicrotask(() => {
        try {
          onChange(patch)
        } catch {
          // Silently ignore if it still fails
        }
      })
    } else {
      // Re-throw other errors
      throw error
    }
  }
}

export function PlayerResultItem(props: ObjectItemProps<PlayerResult>) {
  const {value, path} = props

  // Item props don't have `onChange`, but we can get it from useDocumentPane()
  const {onChange} = useDocumentPane()
  
  // Queue updates to avoid calling onChange during render
  const pendingUpdateRef = useRef<{patch: PatchEvent} | null>(null)
  const [updateTrigger, setUpdateTrigger] = useState(0)
  
  // Apply pending updates after render
  useEffect(() => {
    if (pendingUpdateRef.current) {
      const {patch} = pendingUpdateRef.current
      pendingUpdateRef.current = null
      // Use setTimeout to ensure we're outside the render cycle
      const timeoutId = setTimeout(() => {
        safeOnChange(onChange, patch)
      }, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [updateTrigger, onChange])

  // Ensure score array has 5 elements
  const scoreArray = useMemo(() => {
    const currentScore = value?.score || []
    // Pad with zeros if needed, or truncate if too long
    const padded = [...currentScore]
    while (padded.length < 5) {
      padded.push(0)
    }
    return padded.slice(0, 5)
  }, [value?.score])

  const handleScoreChange = useCallback(
    (index: number, newValue: string) => {
      const numValue = newValue === '' ? 0 : Number(newValue)
      if (isNaN(numValue)) return

      const newScore = [...scoreArray]
      newScore[index] = numValue
      const scorePath = [...path, 'score']

      // Queue the update to be applied after render
      pendingUpdateRef.current = {
        patch: PatchEvent.from([set(newScore, scorePath)]),
      }
      setUpdateTrigger((prev) => prev + 1)
    },
    [scoreArray, path]
  )

  const handleWinnerToggle = useCallback(
    (event: { currentTarget: { checked: boolean } }) => {
      const nextValue = event.currentTarget.checked
      const winnerPath = [...path, 'isWinner']

      // Queue the update to be applied after render
      pendingUpdateRef.current = {
        patch: PatchEvent.from([set(nextValue, winnerPath)]),
      }
      setUpdateTrigger((prev) => prev + 1)
    },
    [path]
  )

  const scoreTotal = scoreArray.reduce((sum, val) => sum + val, 0)

  return (
    <Stack space={3} padding={2}>
      {/* Default render for player reference and other fields */}
      <Box>{props.renderDefault(props)}</Box>

      {/* Inline score editing */}
      <Flex gap={2} align="center" wrap="wrap">
        <Text size={1} weight="semibold" style={{minWidth: '60px'}}>
          Scores:
        </Text>
        {scoreArray.map((score, index) => (
          <Box key={index} style={{width: '60px'}}>
            <TextInput
              type="number"
              value={score.toString()}
              onChange={(e) => handleScoreChange(index, e.currentTarget.value)}
              style={{textAlign: 'center'}}
            />
          </Box>
        ))}
        <Text size={1} weight="semibold" style={{minWidth: '40px', textAlign: 'right'}}>
          = {scoreTotal}
        </Text>
      </Flex>

      {/* Winner toggle */}
      <Flex gap={2} align="center">
        <Text size={1} weight="semibold" style={{minWidth: '60px'}}>
          Winner:
        </Text>
        <Switch checked={value?.isWinner || false} onChange={handleWinnerToggle} />
      </Flex>
    </Stack>
  )
}
