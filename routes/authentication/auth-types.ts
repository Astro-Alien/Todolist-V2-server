/**
 * This file defines the types/interface used in the authentication module.
 */

/**
 * @interface IUser - Interface representing a user in the authentication system.
 * @property {string} username - The username of the user.
 * @property {string | number} password - The password of the user, which can be a string or a number.
 */
export interface IUser {
    username: string;
    password: string | number;
}
