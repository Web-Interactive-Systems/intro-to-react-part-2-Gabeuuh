import { atom } from 'nanostores'

export const $agents = atom([
  {
    id: Math.random().toString(),
    emoji: '😀',
    title: 'Scifi writer',
    role: 'your are a wonderful writer',
    response_format: 'text',
    temperature: 0.1,
    desired_response: 'a draft of scifi writing',
  },
])

export const addAgent = (agent) => {
  $agents.set([...$agents.get(), agent])
}

export const updateAgent = (formData) => {
    const agents = $agents.get()
    const index =agents.findIndex(agent => agent.id === formData.id)
    agents[index] = {
      ...agents[index],
      ...formData,
    }
  $agents.set(agents)
}

export const removeAgent = (id) => {
  $agents.set($agents.get().filter(agent => agent.id !== id))
}

