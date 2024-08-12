import { Card, List } from 'antd'

function MemberList({members}) {
  return (
    <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={members}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.name}/>
      </List.Item>
    )}
  />
  )
}

export default MemberList