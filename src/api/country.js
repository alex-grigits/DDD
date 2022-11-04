module.exports = ({ db, console }) => {
  const countryDb = db('country');

  return {
    read(id) {
      console.info({ userId: id || 'all' });
      return countryDb.read(id);
    },
    find(mask) {
      const sql = 'SELECT * from country where name like $1';
      return countryDb.query(sql, [mask]);
    },
  };
};
