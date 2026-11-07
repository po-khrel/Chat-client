import { useState } from 'react'
import { useUser } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

const Login = () => {
  const { login, loading } = useUser()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = await login(email, password)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10'>
      <Card className='w-full max-w-md border-border/60 shadow-lg'>
        <CardHeader className='space-y-2 pb-6 text-center'>
          <CardTitle className='text-2xl font-semibold tracking-tight'>
            Login
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Login to continue chatting with your friends.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium'>
                Email
              </label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='password' className='text-sm font-medium'>
                Password
              </label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p
                role='alert'
                className='rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive'
              >
                {error}
              </p>
            )}
            <Button type='submit' size='lg' className='w-full' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='justify-center border-t-0 bg-transparent pt-0'>
          <p className='text-center text-sm text-foreground'>
            Don't have an account?{' '}
            <button
              type='button'
              className='cursor-pointer font-medium text-primary underline underline-offset-4 hover:text-primary/80'
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
