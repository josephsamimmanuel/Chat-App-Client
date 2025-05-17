import React from 'react'

function DialogBox({ handleLogout, setDialogBoxOpen, content, logoutButtonText, cancelButtonText }) {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4'>
        <div className='bg-white p-4 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl sm:text-2xl font-bold'>Dialog Box</h1>
                <button 
                    className='text-xl sm:text-2xl font-bold hover:text-gray-600 transition-colors' 
                    onClick={() => setDialogBoxOpen(false)}
                >
                    X
                </button>
            </div>
            <div className='mt-4'>
                <p className='text-sm sm:text-base md:text-lg'>{content}</p>
            </div>
            <div className='mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end'>
                <button 
                    className='w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base' 
                    onClick={handleLogout}
                >
                    {logoutButtonText}
                </button>
                <button 
                    className='w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base' 
                    onClick={() => setDialogBoxOpen(false)}
                >
                    {cancelButtonText}
                </button>
            </div>
        </div>
    </div>
  )
}

export default DialogBox