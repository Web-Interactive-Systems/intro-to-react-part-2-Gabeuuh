import React, { useState } from 'react'
import { useStore } from '@nanostores/react'
import { $agentForm, setAgentForm } from '@/store/store'
import { addAgent, updateAgent } from '@/store/agents'
import { Button, TextField, Flex, Slider, Select } from '@radix-ui/themes'
import EmojiPicker from './EmojiPicker'

function AgentForm({ onClose }) {
  const form = useStore($agentForm)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleChange = (e) => {
    console.log('handleChange', e.target.name, e.target.value)
    setAgentForm({ [e.target.name]: e.target.value })
  }

  const handleSlider = (value) => {
    console.log('handleSlider', value)
    setAgentForm({ temperature: value[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit', form)
    if (form.id) {
      updateAgent(form)
    } else {
      addAgent({ ...form, id: Math.random().toString() })
    }
    onClose()
  }

  const handleEmojiSelect = (emoji) => {
    setAgentForm({ emoji })
    setShowEmojiPicker(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction='column'
        gap='5'>
        <Flex direction="column" gap="2">
          <label>Emoji</label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            {form.emoji || "Select Emoji"}
          </Button>
          {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} />}
        </Flex>

        <Flex
          direction='column'
          gap='2'>
          <label htmlFor='title'>Titre</label>
          <TextField.Root
            id='title'
            name='title'
            placeholder='Titre'
            value={form.title}
            onChange={handleChange}
          />
        </Flex>

        <Flex
          direction='column'
          gap='2'>
          <label htmlFor='role'>Rôle</label>
          <TextField.Root
            id='role'
            name='role'
            placeholder='Rôle'
            value={form.role}
            onChange={handleChange}
          />
        </Flex>

        <Flex
          direction='column'
          gap='2'>
          <label>Response Format</label>
          <Select.Root
            value={form.responseFormat}
            onValueChange={(value) => setAgentForm({ responseFormat: value })}>
            <Select.Trigger aria-label='Response Format' />
            <Select.Content>
              <Select.Group>
                <Select.Label>Response Format</Select.Label>
                <Select.Item value='text'>Texte</Select.Item>
                <Select.Item value='json'>JSON</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex
          direction='column'
          gap='2'>
          <label htmlFor='desiredResponse'>Desired Response</label>
          <TextField.Root
            id='desiredResponse'
            name='desiredResponse'
            placeholder='Desired Response'
            value={form.desiredResponse}
            onChange={handleChange}
          />
        </Flex>

        <Flex
          direction='column'
          gap='2'>
          <label htmlFor='temperature'>Temperature</label>
          <Slider
            defaultValue={[0.7]}
            value={[form.temperature || 0.7]}
            onValueChange={handleSlider}
            min={0}
            max={1}
            step={0.001}
            name='temperature'
          />
        </Flex>

        <Button type='submit'>Enregistrer</Button>
      </Flex>
    </form>
  )
}

export default AgentForm
