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
        type:"categories",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name:"business",
        type:"categories",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"japan",
        type:"country",
        abbreviation: 'jp',
        createdAt: new Date(),
        updatedAt: new Date()
        
      },
      {
        name:"united states",
        type:"country",
        abbreviation: 'us',
        createdAt: new Date(),
        updatedAt: new Date()
        
      },
      {
        name:"technology",
        type:"categories",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"australia",
        type:"country",
        abbreviation: 'au',
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
          password: bcrypt.hashSync('hello', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          email:"bot@gmail.com",
          password: bcrypt.hashSync('hello', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          email:"chatterbox@gmail.com",
          password: bcrypt.hashSync('hello', 12),
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
