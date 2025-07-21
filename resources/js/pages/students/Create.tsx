'use client'

import * as React from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

export default function CreateStudent() {
  const { data, setData, post, processing, errors } = useForm({
    no_ppdb: '',
    nisn: '',
    name: '',
    class: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('students.store'))
  }

  return (
    <AppLayout>
      <Head title="Create Student" />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Create New Student</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="no_ppdb">No. PPDB</Label>
            <Input
              id="no_ppdb"
              type="text"
              value={data.no_ppdb}
              onChange={(e) => setData('no_ppdb', e.target.value)}
              className={errors.no_ppdb ? 'border-red-500' : ''}
            />
            {errors.no_ppdb && (
              <p className="text-red-500 text-sm mt-1">{errors.no_ppdb}</p>
            )}
          </div>

          <div>
            <Label htmlFor="nisn">NISN</Label>
            <Input
              id="nisn"
              type="text"
              value={data.nisn}
              onChange={(e) => setData('nisn', e.target.value)}
              className={errors.nisn ? 'border-red-500' : ''}
            />
            {errors.nisn && (
              <p className="text-red-500 text-sm mt-1">{errors.nisn}</p>
            )}
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="class">Class</Label>
            <Input
              id="class"
              type="text"
              value={data.class}
              onChange={(e) => setData('class', e.target.value)}
              className={errors.class ? 'border-red-500' : ''}
            />
            {errors.class && (
              <p className="text-red-500 text-sm mt-1">{errors.class}</p>
            )}
          </div>

          <Button type="submit" disabled={processing}>
            {processing ? 'Saving...' : 'Save Student'}
          </Button>
        </form>
      </div>
    </AppLayout>
  )
}
