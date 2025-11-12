import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { createUser } from '../services/api'
import type { User } from '../types'

export default function CreateUser(): JSX.Element {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function onSubmit(form: User) {
    try {
      setLoading(true)
      const res = await createUser(form)
      alert('User created (simulated): id=' + res.id)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Create failed: ' + (err instanceof Error ? err.message : 'unknown'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h2>Create User</h2>
      <UserForm onSubmit={onSubmit} submitText={loading ? 'Creating...' : 'Create'} />
    </section>
  )
}
