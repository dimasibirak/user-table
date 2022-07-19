import { createAction } from "@reduxjs/toolkit";

const switchLoader = createAction<boolean>('users/switchLoader');

export { switchLoader };
