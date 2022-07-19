import { createSlice } from '@reduxjs/toolkit';

import { IUsersState } from './types'
import { generate, addUser } from './thunks'

import { IUser } from '../../models'

import { switchLoader } from './actions';

const initialState: IUsersState = {
    fetching: false,
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        cleanUsers: (state) => {
            state.users = [];
        },
        setUsers: (state, { payload }) => {
            state.users = [...payload, ...state.users];
        },
        setFetching: (state, { payload }) => {
            state.fetching = payload;
        },
        deleteUser: (state, { payload }) => {
            state.users = state.users.filter((user) => user.id.value !== payload);
        },
        updateUser: (state, { payload }) => {
            const userId = payload.id;

            const filteredUserList = state.users.map((user) => {
                if(user.id.value === userId) {
                    return {
                        ...user,
                        name: {
                            title: payload.title,
                            first: payload.firstname,
                            last: payload.lastname,
                        },
                        email: payload.email,
                        phone: payload.phone,
                        cell: payload.cell,
                        dob: {
                            age: payload.age,
                            date: payload.date,
                        },
                    }
                }
                return user;
            });

            state.users = [...filteredUserList];
        },
    },
    extraReducers: (builder) => {
        builder
            // Генерация, перегенерация таблицы
            .addCase(generate.pending, (state) => {
                userSlice.caseReducers.setFetching(state, switchLoader(true));
            })
            .addCase(generate.fulfilled, (state, action) => {
                userSlice.caseReducers.cleanUsers(state);
                userSlice.caseReducers.setUsers(state, action);
                userSlice.caseReducers.setFetching(state, switchLoader(false));
            })
            .addCase(generate.rejected, (state) => {
                userSlice.caseReducers.setFetching(state, switchLoader(false));
                // тут бы вывод какой нибудь об ошибке, notify как пример
            })

            // добавление юзера
            .addCase(addUser.pending, (state) => {
                userSlice.caseReducers.setFetching(state, switchLoader(true));
            })
            .addCase(addUser.fulfilled, (state, action) => {
                userSlice.caseReducers.setUsers(state, action);
                userSlice.caseReducers.setFetching(state, switchLoader(false));
            })
            .addCase(addUser.rejected, (state) => {
                userSlice.caseReducers.setFetching(state, switchLoader(false));
                // тут бы вывод какой нибудь об ошибке, notify как пример
            })
    },
});

export const { deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
