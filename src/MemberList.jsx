import { Button, List } from "antd";
import MemberCard from "./MemberCard";
import { PlusOutlined } from "@ant-design/icons";
import CreateMember from "./CreateMember";

function MemberList({ members, setMembers }) {
  const displayItem = [...members];
  displayItem.push({});
  const addMember = () => {};
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 4,
        xxl: 6,
      }}
      dataSource={displayItem}
      renderItem={(item, index) => {
        if (index < displayItem.length - 1)
          return (
            <List.Item>
              <MemberCard member={item} />
            </List.Item>
          );
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              paddingBottom: 16,
              paddingLeft: 8,
              paddingRight: 8,
              boxSizing: "border-box",
            }}
          >
            <CreateMember members={members} setMembers={setMembers} />
          </div>
        );
      }}
    ></List>
  );
}

export default MemberList;
