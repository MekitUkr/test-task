import { useEffect, useState } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/slices/userSlice'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useApiMessage } from '../hooks'

const { Title } = Typography

const inputsRules = [
  { inputId: 'email', type: 'email', required: true, message: 'Please input your email!' },
  { inputId: 'password', required: true, message: 'Please input your password!' }
]

function getInputRules (inputId) {
  return inputsRules
    .filter(rule => rule.inputId === inputId)
    .map(rule => ({
      ...rule,
      inputId: undefined
    }))
}

const SignupPage = () => {
  const user = useSelector(state => state.user)
  const [createMessage, contextHolder] = useApiMessage()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.id) {
      navigate('/projects')
    }
  }, [user, navigate])

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      createMessage({ type: 'error', content: 'Passwords do not match!' })
      return
    }

    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email: values.email,
        password: values.password
      }, {
        withCredentials: true,
      })

      const responseUser = res.data.user
      const user = {
        id: responseUser._id,
        email: responseUser.email
      }
      dispatch(setUser(user))
      createMessage({ type: 'success', content: 'Successfully registered!' })
      // navigate('/projects')
    } catch (error) {
      console.error(error)
      createMessage({
        type: 'error',
        content: error.response?.data?.message || 'Signup failed'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <div style={{ maxWidth: 400, margin: '100px auto' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={getInputRules('email')}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={getInputRules('password')}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <span>Already have an account? </span>
            <Link to="/login">Login here</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default SignupPage
