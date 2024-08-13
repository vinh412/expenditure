import React from "react";

import GroupField from "./GroupField";
import MemberList from "./MemberList";
import CreateGroup from "./CreateGroup";
import { v4 as uuidv4 } from "uuid";
import Calculate from "./Calculate";
import { Tabs } from "antd";

function Expenditure() {
  const [members, setMembers] = React.useState([
    {
      id: uuidv4(),
      name: "Vinh",
    },
    {
      id: uuidv4(),
      name: "Kiên",
    },
    {
      id: uuidv4(),
      name: "Khiêm",
    },
    {
      id: uuidv4(),
      name: "Luyện",
    },
    {
      id: uuidv4(),
      name: "Phi",
    },
    {
      id: uuidv4(),
      name: "Phong",
    },
    {
      id: uuidv4(),
      name: "Quân",
    },
  ]);
  const [groups, setGroups] = React.useState([
    {
      id: uuidv4(),
      name: "Chung",
      members: members.map((item) => {
        return { ...item, expenditures: [] };
      }),
    },
  ]);
  const groupsDataSource = groups.map((group) => {
    return {
      ...group,
      members: group.members
        .map((member) => {
          let expendituresLength = member.expenditures.length;
          let arr = member.expenditures.map((expenditure, index) => {
            return {
              ...expenditure,
              groupId: group.id,
              memberId: member.id,
              memberName: member.name,
              rowSpan: index === 0 ? expendituresLength + 1 : 0,
            };
          });
          arr.push({
            id: uuidv4(),
            groupId: group.id,
            memberId: member.id,
            memberName: member.name,
            price: 0,
            note: "",
            rowSpan: expendituresLength === 0 ? 1 : 0,
          });
          return arr;
        })
        .flat(),
    };
  });
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={[
        {
          label: "Members",
          key: "1",
          children: <MemberList members={members} setMembers={setMembers} />
        },
        {
          label: "Groups",
          key: "2",
          children: (
            <div>
              <CreateGroup
                members={members}
                groups={groups}
                setGroups={setGroups}
              />
              <GroupField
                groups={groups}
                setGroups={setGroups}
                groupsDataSource={groupsDataSource}
              />
              <Calculate groups={groups} members={members} />
            </div>
          ),
        },
      ]}
    />
  );
}

export default Expenditure;
