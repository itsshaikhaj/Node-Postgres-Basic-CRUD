const pool = require('../db');

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const newUser = await pool.query(
            'INSERT INTO USERS (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getUsers = async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM USERS');
        res.json({
            status: 'success',
            count: allUsers.rowCount,
            data: allUsers.rows
        });

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  
      if (user.rows.length === 0) {
        return res.status(404).send('User not found');
      }
  
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
  
      const user = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
  
      if (user.rows.length === 0) {
        return res.status(404).send('User not found');
      }
  
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  
      if (user.rows.length === 0) {
        return res.status(404).send('User not found');
      }
  
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};