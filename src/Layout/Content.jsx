import {Content} from 'antd/lib/layout/layout'
import {Outlet} from 'react-router-dom'

const ContentBase = () => {
  return (
    <Content>
      <Outlet/>
    </Content>
  )
}

export default ContentBase
