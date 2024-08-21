import React from 'react'
import { Card, CardContent } from './ui/card'

const HomeCard = () => {
  return (
    <Card className=''>
      <CardContent className='p-5'>
        <h1 className='text-2xl font-bold'>Home Card</h1>
        <p className='text-gray-500'>This is a card component</p>
      </CardContent>
    </Card>
  )
}

export default HomeCard
