import { useStore } from '@nanostores/react'
import { $agents } from '@/store/agents'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Card, Flex, Button } from '@radix-ui/themes'

function AgentList({ onEdit, onDelete, onSelect, selectedAgent }) {
  const agents = useStore($agents)

  return (
    <Flex direction="column" gap="3">
      {agents.map(agent => (
        <Card
          key={agent.id}
          onClick={() => onSelect(agent.id)}
          style={{
            background: selectedAgent === agent.id ? 'var(--focus-7)' : '',
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: 28 }}>{agent.emoji}</span>
          <div style={{ flex: 1 }}>
            <div>{agent.title}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{agent.role}</div>
          </div>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(agent)
            }}
            color={'blue'}
          >
            <Pencil1Icon />
          </Button>
          <Button
            variant="ghost"
            color="red"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(agent.id)
            }}
          >
            <TrashIcon />
          </Button>
        </Card>
      ))}
    </Flex>
  )
}

export default AgentList