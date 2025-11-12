import React from 'react'
import UserCard from './UserCard'
import type { User } from '../types'

export default function UserList({ users, onDelete }: { users: User[]; onDelete: (id?: number) => void }) {
  if (!users.length) return <p>No users to show.</p>

  return (
    <div className="user-list">
      {users.map(u => (
        <UserCard key={u.id} user={u} onDelete={onDelete} />
      ))}
    </div>
  )
}
