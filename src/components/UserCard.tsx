import React from 'react'
import { Link } from 'react-router-dom'
import type { User } from '../types'

export default function UserCard({ user, onDelete }: { user: User; onDelete: (id?: number) => void }) {
  return (
    <div className="user-card">
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <div className="user-actions">
        <Link to={`/user/${user.id}`} className="btn small">View</Link>
        <Link to={`/edit/${user.id}`} className="btn small muted">Edit</Link>
        <button className="btn small danger" onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  )
}
