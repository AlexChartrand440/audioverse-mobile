interface User {
	userId: number;
	sessionToken: string;
}

export type UserState = User | null;

export const USER = 'USER';

interface SetUserAction {
	type: typeof USER;
	user: UserState;
}

export type UserActionTypes = SetUserAction;
