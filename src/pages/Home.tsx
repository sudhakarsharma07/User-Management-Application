import React, { useEffect, useState } from 'react'
import { fetchUsers, deleteUser } from '../services/api'
import UserList from '../components/UserList'
import Spinner from '../components/Spinner'
import type { User } from '../types'

export default function Home(): JSX.Element {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchUsers()
      .then(data => {
        if (!mounted) return
        setUsers(data)
        setError(null)
      })
      .catch(err => {
        console.error(err)
        setError(err.message || 'Failed to load users')
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  async function handleDelete(id?: number) {
    if (!id) return
    if (!confirm('Are you sure to delete this user?')) return
    try {
      await deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
      alert('User deleted (simulated)')
    } catch (err) {
      console.error(err)
      alert('Delete failed: ' + (err instanceof Error ? err.message : 'unknown'))
    }
  }

  return (
    <section>
      <h2>Users</h2>
      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <>
          <UserList users={users} onDelete={handleDelete} />
        </>
      )}
    </section>
  )
}
