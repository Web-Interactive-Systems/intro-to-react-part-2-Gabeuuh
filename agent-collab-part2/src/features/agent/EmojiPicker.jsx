import React from 'react'
import { Tabs, Box, Button, Flex } from '@radix-ui/themes'
import {
  EXPRESSIONES,
  NATURE,
  GESTURES,
  SYMBOLS,
  FOOD,
  ACTIVITIES,
  PLACES,
} from '@/utils/emojis'

function EmojiCategory({ emojis, onSelect }) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const perPage = 20
  const totalPages = Math.ceil(emojis.length / perPage)
  const startIndex = (currentPage - 1) * perPage
  const currentEmojis = emojis.slice(startIndex, startIndex + perPage)

  return (
    <Flex direction='column'>
      <Flex
        wrap='wrap'
        gap={4}>
        {currentEmojis.map((emoji, index) => (
          <button
            key={startIndex + index}
            onClick={() => onSelect(emoji)}
            style={{
              fontSize: 24,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}>
            {emoji}
          </button>
        ))}
      </Flex>
      {totalPages > 1 && (
        <Flex
          justify='center'
          gap={2}
          mt='2'
          align='center'>
          <Button
            type='button'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant='outline'>
            Précédent
          </Button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <Button
            type='button'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant='outline'>
            Suivant
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

function EmojiPicker({ onSelect }) {
  return (
    <Tabs.Root defaultValue='expressions'>
      <Tabs.List>
        <Tabs.Trigger value='expressions'>Expressions</Tabs.Trigger>
        <Tabs.Trigger value='nature'>Nature</Tabs.Trigger>
        <Tabs.Trigger value='gestures'>Gestures</Tabs.Trigger>
        <Tabs.Trigger value='symbols'>Symbols</Tabs.Trigger>
        <Tabs.Trigger value='food'>Food</Tabs.Trigger>
        <Tabs.Trigger value='activities'>Activities</Tabs.Trigger>
        <Tabs.Trigger value='places'>Places</Tabs.Trigger>
      </Tabs.List>
      <Box pt='3'>
        <Tabs.Content value='expressions'>
          <EmojiCategory
            emojis={EXPRESSIONES}
            onSelect={onSelect}
          />
        </Tabs.Content>
        <Tabs.Content value='nature'>
          <EmojiCategory
            emojis={NATURE}
            onSelect={onSelect}
          />
        </Tabs.Content>
        <Tabs.Content value='gestures'>
          <EmojiCategory
            emojis={GESTURES}
            onSelect={onSelect}
          />
        </Tabs.Content>
        <Tabs.Content value='symbols'>
          <EmojiCategory
            emojis={SYMBOLS}
            onSelect={onSelect}
          />
        </Tabs.Content>
        <Tabs.Content value='food'>
          <EmojiCategory
            emojis={FOOD}
            onSelect={onSelect}
          />
        </Tabs.Content>
        <Tabs.Content value='activities'>
          <EmojiCategory
            emojis={ACTIVITIES}
            onSelect={onSelect}
          />
        </Tabs.Content>
        <Tabs.Content value='places'>
          <EmojiCategory
            emojis={PLACES}
            onSelect={onSelect}
          />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  )
}

export default EmojiPicker
