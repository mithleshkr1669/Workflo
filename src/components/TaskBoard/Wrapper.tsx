import React from 'react'
import Todo from './Todo'
import InProgress from './InProgress'
import UnderReview from './UnderReview'
import Finished from './Finished'

function Wrapper() {
  return (
    <div className='mt-4 border-11 border-black bg-white flex'>
          <Todo></Todo>
          <InProgress></InProgress>
          <UnderReview></UnderReview>
          <Finished></Finished>
    </div>
  )
}

export default Wrapper
