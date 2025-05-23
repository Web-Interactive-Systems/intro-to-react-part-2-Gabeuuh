import { useState } from 'react'
import { Flex, Button } from '@radix-ui/themes'
import AgentList from './AgentList'
import AgentForm from './AgentForm'
import { addAgent, setAgentForm } from '@/store/store'
import { removeAgent } from '@/store/agents'

function Agent() {
  const [showForm, setShowForm] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)

  const handleAdd = () => {
    const newAgent = {
      id: Math.random().toString(),
      title: 'Nouvel Agent',
      emoji: '🤖',
      role: 'assistant',
      temperature: 0.7,
      responseFormat: 'text',
    }
    addAgent(newAgent)
    setAgentForm(newAgent)
    setShowForm(true)
    setSelectedAgent(newAgent.id)
  }

const handleEdit = (agent) => {
  if (selectedAgent === agent.id && showForm) {
    setShowForm(false)
  } else {
    setAgentForm(agent)
    setShowForm(true)
    setSelectedAgent(agent.id)
  }
}

  const handleDelete = (agentId) => {
    removeAgent(agentId)
    if (selectedAgent === agentId) {
      setShowForm(false)
      setSelectedAgent(null)
    }
  }

  return (
    <Flex direction='row' gap='8'>
      <Flex direction='column' gap='3'>
        <Button onClick={handleAdd}>+ Ajouter</Button>
        <AgentList
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={setSelectedAgent}
          selectedAgent={selectedAgent}
        />
      </Flex>
      {showForm && <AgentForm onClose={() => setShowForm(false)} />}
    </Flex>
  )
}

export default Agent