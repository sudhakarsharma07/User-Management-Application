import React, { useState, useEffect } from 'react'
import type { User } from '../types'

export default function UserForm({ initial = {}, onSubmit, submitText = 'Save' }: {
  initial?: Partial<User>
  onSubmit: (u: User) => void
  submitText?: string
}) {
  const [form, setForm] = useState<User>({ name: '', email: '', phone: '', ...initial } as User)

  useEffect(() => setForm({ name: '', email: '', phone: '', ...initial } as User), [initial])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name?.trim() || !form.email?.trim()) return alert('Name and email are required')
    onSubmit(form)
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>

      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
      </label>

      <label>
        Phone
        <input name="phone" value={form.phone} onChange={handleChange} />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn">{submitText}</button>
      </div>
    </form>
  )
}
