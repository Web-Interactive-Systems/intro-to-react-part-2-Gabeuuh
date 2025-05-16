import { atom } from 'nanostores'

export const $agentForm = atom({
  emoji: '',
  title: '',
  role: '',
  responseFormat: 'text',
  desiredResponse:'',
  temperature: 0.7
})

export const setAgentForm = (data) => {
  $agentForm.set({ ...$agentForm.get(), ...data })
}

