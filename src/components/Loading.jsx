



const Loading = () => {

  return (
   <div className="flex items-center h-screen justify-center space-x-2 p-4">
      <span className="sr-only">Loading</span>
      <div 
        className="h-3 w-3 bg-blue-600 rounded-full animate-bounce" 
        style={{ animationDelay: '-0.3s' }} 
      />
      <div 
        className="h-3 w-3 bg-blue-600 rounded-full animate-bounce" 
        style={{ animationDelay: '-0.15s' }} 
      />
      <div 
        className="h-3 w-3 bg-blue-600 rounded-full animate-bounce" 
      />
    </div>
  )
}

export default Loading
