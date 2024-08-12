import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";

const CreateGroup = ({ members, groups, setGroups }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const options = members.map((item) => {
    return { label: item.name, value: {...item, expenditures: []} };
  });
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setGroups([...groups, values]);
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Group
      </Button>
      <Modal
        open={open}
        title="Create a new group"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of group!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="members" label="Members">
          <Checkbox.Group options={options} />
        </Form.Item>
      </Modal>
    </>
  );
};
export default CreateGroup;
