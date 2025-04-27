import { useState } from 'react'
import { Button, Menu } from 'antd'
import { LoginOutlined, LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearUser } from '../store/slices/userSlice'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('')

  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const handleLogout = () => {
    dispatch(clearUser())
    navigate('/login')
  }

  const items = user.id ? [
    {
      label: <Link to="/projects">Projects</Link>,
      key: 'projects',
      icon: <UnorderedListOutlined />
    },
    {
      label: (
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      ),
      key: 'logout',
      icon: <LogoutOutlined />
    }
  ] : [
    {
      label: <Link to="/login">Login</Link>,
      key: 'login',
      icon: <LoginOutlined />
    }
  ]

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ borderBottom: '1px solid gray' }}
    />
  )
}

export default Navbar
