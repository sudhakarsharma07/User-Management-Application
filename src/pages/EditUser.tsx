import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { fetchUsers, updateUser } from '../services/api'
import Spinner from '../components/Spinner'
import type { User } from '../types'

export default function EditUser(): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initial, setInitial] = useState<Partial<User> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchUsers()
      .then(list => {
        if (!mounted) return
        const u = list.find(x => String(x.id) === String(id))
        if (!u) throw new Error('User not found')
        setInitial({ name: u.name, email: u.email, phone: u.phone })
      })
      .catch(err => {
        alert('Could not load user: ' + (err instanceof Error ? err.message : ''))
      })
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id])

  async function onSubmit(form: User) {
    try {
      setLoading(true)
      await updateUser(id || 0, form)
      alert('User updated (simulated)')
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Update failed: ' + (err instanceof Error ? err.message : 'unknown'))
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner />
  if (!initial) return <div className="error">User not available</div>

  return (
    <section>
      <h2>Edit User</h2>
      <UserForm initial={initial} onSubmit={onSubmit} submitText={loading ? 'Saving...' : 'Save'} />
    </section>
  )
}
