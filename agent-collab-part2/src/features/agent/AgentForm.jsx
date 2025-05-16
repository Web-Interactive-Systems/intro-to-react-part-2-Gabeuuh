import { useStore } from '@nanostores/react'
import { $agentForm, setAgentForm } from '@/store/store'
import { addAgent, updateAgent } from '@/store/agents'
import { Button, TextField, Flex, Slider } from '@radix-ui/themes'

function AgentForm({ onClose }) {
  const form = useStore($agentForm)

  const handleChange = (e) => {
    console.log('handleChange', e.target.name, e.target.value)
    setAgentForm({ [e.target.name]: e.target.value })
  }

const handleSlider = (value) => {
    console.log('handleSlider', value)
    setAgentForm({ temperature: value[0] })
  } 

  const handleSubmit = (e) => {
    console.log('handleSubmit', form)
    e.preventDefault()
    if (form.id) {
      updateAgent(form)
    } else {
      addAgent({ ...form, id: Math.random().toString() })
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="2">
        <TextField.Root
            name="emoji"
            placeholder="Emoji"
            value={form.emoji}
            onChange={handleChange}
        />
        <TextField.Root
            name="title"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
        />
        <TextField.Root
            name="role"
            placeholder="Rôle"
            value={form.role}
            onChange={handleChange}
          />
        <TextField.Root

            name="responseFormat"
            placeholder="Response Format"
            value={form.responseFormat}
            onChange={handleChange}
          />
        <TextField.Root
            name="desiredResponse"
            placeholder="Desired Response"
            value={form.desiredResponse}
            onChange={handleChange}
          />
        <Slider defaultValue={[0.7]} value={[form.temperature || 0.7]} onValueChange={handleSlider} min={0} max={1} step={0.001} name='temperature'/>
        <Button type="submit">Enregistrer</Button>
      </Flex>
    </form>
  )
}

export default AgentForm