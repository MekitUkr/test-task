import { useEffect } from 'react'
import { Table, Button, Input, Form, Space, Typography } from 'antd'
import { ReloadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useApiMessage } from '../hooks'
import { setRepos, updateRepo, addRepo, removeRepo, setLoading } from '../store/slices/reposSlice'

const { Title } = Typography

const ProjectsPage = () => {
  const [createMessage, contextHolder] = useApiMessage()
  const dispatch = useDispatch()
  const { items: repos, loading } = useSelector(state => state.repos)
  const [addForm] = Form.useForm()

  const fetchProjects = async () => {
    try {
      dispatch(setLoading(true))
      const res = await axios.get('http://localhost:5000/api/repos', { withCredentials: true })
      dispatch(setRepos(res.data))
      createMessage({ type: 'success', content: 'Projects loaded' })
    } catch (error) {
      console.error(error)
      createMessage({ type: 'error', content: 'Failed to load repos' })
    } finally {
      dispatch(setLoading(false))
    }
  }

  const addProject = async (values) => {
    try {
      dispatch(setLoading(true))
      const res = await axios.post('http://localhost:5000/api/repos', values, { withCredentials: true })
      dispatch(addRepo(res.data))
      createMessage({ type: 'success', content: 'Project added successfully' })
      addForm.resetFields()
    } catch (error) {
      console.error(error)
      createMessage({ type: 'error', content: error.response?.data?.message || 'Failed to add project' })
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updateProject = async (id) => {
    try {
      dispatch(setLoading(true))
      const res = await axios.get(`http://localhost:5000/api/repos/${id}`, { withCredentials: true })
      dispatch(updateRepo(res.data))
      createMessage({ type: 'success', content: 'Project updated successfully' })
    } catch (error) {
      console.error(error)
      createMessage({ type: 'error', content: 'Failed to update project' })
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deleteProject = async (id) => {
    try {
      dispatch(setLoading(true))
      await axios.delete(`http://localhost:5000/api/repos/${id}`, { withCredentials: true })
      dispatch(removeRepo(id))
      createMessage({ type: 'success', content: 'Project deleted successfully' })
    } catch (error) {
      console.error(error)
      createMessage({ type: 'error', content: 'Failed to delete project' })
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const columns = [
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'URL', dataIndex: 'url', key: 'url', render: url => <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> },
    { title: 'Stars', dataIndex: 'stars', key: 'stars' },
    { title: 'Forks', dataIndex: 'forks', key: 'forks' },
    { title: 'Issues', dataIndex: 'issues', key: 'issues' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: timestamp => new Date(timestamp).toUTCString() },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => updateProject(record._id)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => deleteProject(record._id)} />
        </Space>
      ),
    }
  ]

  return (
    <>
      {contextHolder}
      <div style={{ padding: '20px' }}>
        <Title level={2}>Projects</Title>

        <Form
          form={addForm}
          layout="inline"
          onFinish={addProject}
          style={{ marginBottom: '20px' }}
        >
          <Form.Item
            name="path"
            rules={[
              { required: true, message: 'Please input repository path (e.g. facebook/react)' }
            ]}
            style={{ flexGrow: 1 }}
          >
            <Input placeholder="facebook/react" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Add
            </Button>
          </Form.Item>
        </Form>

        <Table
          columns={columns}
          dataSource={repos}
          rowKey="_id"
          loading={loading}
        />
      </div>
    </>
  )
}

export default ProjectsPage
