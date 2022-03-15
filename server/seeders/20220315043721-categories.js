'use strict';
const db = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await db.sequelize.sync({force: true});
    console.log('All models synced');

    await queryInterface.bulkDelete('categories', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });

    const categories = await queryInterface.bulkInsert('categories', [
      {
        name:"health",
        type:"cat",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name:"business",
        type:"cat",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"jp",
        type:"country",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"us",
        type:"country",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"technology",
        type:"cat",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"au",
        type:"country",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], {returning: true});
      console.log('bulk insert:', categories);


      await queryInterface.bulkDelete('users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });

      const users = await queryInterface.bulkInsert('users', [
        {
          email:"example@gmail.com",
          password: bcrypt.hashSync('hello world', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          email:"bot@gmail.com",
          password: bcrypt.hashSync('hello world', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          email:"chatterbox@gmail.com",
          password: bcrypt.hashSync('hello world', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        
        ], {returning: true});
      console.log('bulk insert:', users)

      await queryInterface.bulkDelete('userCategories', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });

      const userCategories = await queryInterface.bulkInsert('userCategories', [
        {
          userId: users[0].id, 
          categoryId: categories[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          userId: users[1].id, 
          categoryId: categories[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          userId: users[0].id, 
          categoryId: categories[2].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        
        ], {returning: true});
        console.log('mapping of categories to users: ', userCategories);

        
  },
  

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
