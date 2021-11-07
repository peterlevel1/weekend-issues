module.exports = {
  async up(queryInterface, Sequelize) {
    const { BOOLEAN } = Sequelize;

    // const tableDesc = await queryInterface.describeTable('users');
    // console.log('tableDesc', tableDesc);
    await queryInterface.changeColumn(
      'users', 
      'sex', 
      { type: BOOLEAN }, 
      { after: 'email' }
    );
  },
  async down(queryInterface, Sequelize) {
    const { BOOLEAN } = Sequelize;

    await queryInterface.changeColumn(
      'users', 
      'sex', 
      { type: BOOLEAN }, 
      { after: 'deleted_at' }
    );
  },
};
