import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Filters() {
  return (
    <div className="flex flex-col gap-2">
        <Input placeholder='Country'></Input>
        <Button>Apply</Button>
    </div>
  )
}
