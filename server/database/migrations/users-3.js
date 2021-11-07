module.exports = {
  async up(queryInterface, Sequelize) {
    // console.log('queryInterface.sequelize', queryInterface.sequelize);
    await queryInterface.sequelize.query('\
      ALTER TABLE `wi-dev`.`users`\
      CHANGE COLUMN `address` `address` VARCHAR(100) NULL DEFAULT NULL AFTER `sex`;\
    ');
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query('\
      ALTER TABLE `wi-dev`.`users`\
      CHANGE COLUMN `address` `address` VARCHAR(100) NULL DEFAULT NULL AFTER `deleted_at`;\
    ');
  },
};
