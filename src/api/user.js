module.exports = ({ db, common, console }) => {
  const usersDb = db('users');

  return {
    read(id) {
      console.log('id => ', id);
      return usersDb.read(id, ['id', 'login']);
    },

    async create({ login, password }) {
      const passwordHash = await common.hash(password);
      return usersDb.create({ login, password: passwordHash });
    },

    async update(id, { login, password }) {
      const passwordHash = await common.hash(password);
      return usersDb.update(id, { login, password: passwordHash });
    },

    delete(id) {
      return usersDb.delete(id);
    },

    find(mask) {
      const sql = 'SELECT login from users where login like $1';
      return usersDb.query(sql, [mask]);
    },
  };
};
