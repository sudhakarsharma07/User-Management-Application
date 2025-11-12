import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchUsers } from '../services/api'
import Spinner from '../components/Spinner'
import type { User } from '../types'

export default function UserDetails(): JSX.Element {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchUsers()
      .then(list => {
        if (!mounted) return
        const u = list.find(x => String(x.id) === String(id)) || null
        setUser(u)
      })
      .catch(err => console.error(err))
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id])

  if (loading) return <Spinner />
  if (!user) return <div className="error">User not found</div>

  return (
    <section>
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company?.name}</p>
      <Link to="/" className="btn">Back</Link>
    </section>
  )
}
