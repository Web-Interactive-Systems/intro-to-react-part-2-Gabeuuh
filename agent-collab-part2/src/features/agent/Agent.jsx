import { useState } from 'react'
import { Flex, Button } from '@radix-ui/themes'
import AgentList from './AgentList'
import AgentForm from './AgentForm'
import { setAgentForm } from '@/store/store'

function Agent() {
  const [showForm, setShowForm] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)

  const handleAdd = () => {
    setAgentForm({
      id: null,
      title: 'Nouvel Agent',
      emoji: '🤖',
      role: 'assistant',
      temperature: 0.7,
      responseFormat: 'text'
    })
    setShowForm(true)
    setSelectedAgent(null)
  }

  const handleEdit = (agent) => {
    setAgentForm(agent)
    setShowForm(true)
    setSelectedAgent(agent.id)
  }

  return (
    <Flex
      direction='row'
      gap='8'>
      <Flex
        direction='column'
        gap='3'>
        <Button onClick={handleAdd}>+ Ajouter</Button>
        <AgentList
          onEdit={handleEdit}
          selectedAgent={selectedAgent}
        />
      </Flex>
      {showForm && <AgentForm onClose={() => setShowForm(false)} />}
    </Flex>
  )
}

export default Agent
