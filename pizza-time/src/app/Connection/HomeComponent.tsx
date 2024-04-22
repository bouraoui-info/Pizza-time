 'use client'
import React, { useEffect, useState } from 'react'

const HomeComponent = () => {

// const [data, setData] = useState(null) 
let dataq:any=null
const getdata=()=>{
  fetch('http://localhost:3001/api/users') // Make sure this URL matches your NestJS API endpoint
  .then(response => response.json())
  .then(data =>dataq=data)
  .catch(error => console.error('Error:', error));}
React.useEffect(() => {
  getdata()
}, [])

  
}

export default HomeComponent

