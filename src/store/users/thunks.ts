import { createAsyncThunk } from '@reduxjs/toolkit'

import { randomuser } from '../../utils'

export const generate = createAsyncThunk(
  'users.generate',
  async (count: number) => {
    const users = await randomuser(count)
    return users
  }
)

export const addUser = createAsyncThunk(
    'users.addUser',
    async () => {
        const oneUser = 1;
        const newUser = await randomuser(oneUser);
        return newUser;
    }
)
