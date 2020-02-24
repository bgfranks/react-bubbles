import React, { useState, useEffect } from 'react'

import { axiosWithAuth } from '../utilities/axiosWithAuth'

import Nav from './Nav'
import Bubbles from './Bubbles'
import ColorList from './ColorList'

const BubblePage = () => {
  const [colorList, setColorList] = useState([])
  const [colorUpdated, setColorUpdated] = useState(false)

  useEffect(() => {
    axiosWithAuth(localStorage.getItem('token'))
      .get('http://localhost:5000/api/colors')
      .then(result => {
        //console.log(result.data)
        setColorList(result.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [colorUpdated])

  return (
    <>
      <Nav />
      <div className="bubbles">
        <ColorList
          colors={colorList}
          updateColors={setColorList}
          colorUpdated={colorUpdated}
          setColorUpdated={setColorUpdated}
        />
        <Bubbles colors={colorList} />
      </div>
    </>
  )
}

export default BubblePage
