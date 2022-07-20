import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUser } from '../../models';

import { updateUser } from '../../store/users/slice';

import { Modal, Form, Input, DatePicker, Space } from 'antd';

interface IProps {
    onClose: () => void;
    currentUser: IUser;
}

const ModalWindow = (props: IProps) => {
    const { onClose, currentUser } = props;
    const [user, setUser] = useState({
        id: currentUser?.id.value,
        title: currentUser?.name?.title,
        firstname: currentUser?.name?.first,
        lastname: currentUser?.name?.last,
        email: currentUser?.email,
        phone: currentUser?.phone,
        cell: currentUser?.cell,
        age: currentUser?.dob?.age,
        date: currentUser?.dob?.date,
    });

    const dispatch = useDispatch();

    const updateUserObject = (key: string, value: string | number) => {
        setUser({
            ...user,
            [key]: value,
        });
    };

    const onSubmit = () => {
        dispatch(updateUser(user));
        onClose();
    };

    return (
        <Modal title="Basic Modal" visible={true} onOk={onSubmit} onCancel={onClose}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={() => true}
                onFinishFailed={() => true}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    initialValue={user?.title}
                >
                    <Input onChange={(e) => updateUserObject('title', e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Firstname"
                    name="firstname"
                    initialValue={user?.firstname}
                >
                    <Input onChange={(e) => updateUserObject('firstname', e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Lastname"
                    name="lastname"
                    initialValue={user?.lastname}
                >
                    <Input onChange={(e) => updateUserObject('lastname', e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    initialValue={user?.email}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone number"
                    name="phone"
                    initialValue={user?.phone}
                >
                    <Input onChange={(e) => updateUserObject('phone', e.target.value)}/>
                </Form.Item>
                <Form.Item
                    label="Cell"
                    name="cell"
                    initialValue={user?.cell}
                >
                    <Input onChange={(e) => updateUserObject('cell', e.target.value)}/>
                </Form.Item>
                <Form.Item
                    label="age"
                    name="age"
                    initialValue={user?.age}
                >
                    <Input onChange={(e) => updateUserObject('age', e.target.value)}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalWindow;
