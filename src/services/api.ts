import type { User } from '../types'

const BASE = 'https://jsonplaceholder.typicode.com/users'

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function createUser(payload: User): Promise<User> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create user')
  return res.json()
}

export async function updateUser(id: number | string, payload: User): Promise<User> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update user')
  return res.json()
}

export async function deleteUser(id: number | string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete user')
  return
}
