import pool from "../../postgres.js";

interface IUser {
    username: string;
    email: string;
}

const addUser = async (user: IUser): Promise<string> => {
    try {
        const result = await pool.query(
        'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id',
        [user.username, user.email]
        );
        console.log('User added with ID:', result.rows[0].id);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export { addUser };
