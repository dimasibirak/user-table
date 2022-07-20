import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../store/users/slice';

import { Button } from 'antd';


const DeleteButton = ({ id }: { id: string }) => {
    const dispatch = useDispatch();

    const deleteHandler = (id: string) => {
        dispatch(deleteUser(id));
    };

    return (
        <Button danger type="text" onClick={() => deleteHandler(id)}>Удалить</Button>
    );
}

export default DeleteButton;
