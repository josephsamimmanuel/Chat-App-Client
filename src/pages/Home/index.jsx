import React from 'react'
import Friends from './friends';
import NewLearner from './newLearner';

function Home() {
  return (
    <div className="container mx-auto px-4 py-6"> 
      {/* Friends Section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Your Friends</h2>
        <div >
          <Friends />
        </div>
      </div>

      {/* New Learners Section */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Meet New People</h2>
          <NewLearner />
      </div>
    </div>
  )
}

export default Home