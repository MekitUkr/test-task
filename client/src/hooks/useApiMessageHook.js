import { message } from "antd"

const useApiMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const createMessage = (messageParams) => {
    const { type, content } = messageParams
    messageApi.open({
      type,
      content
    })
  }
  
  return [createMessage, contextHolder]
}

export default useApiMessage
