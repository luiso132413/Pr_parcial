
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {	
	  id_User: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	name :{
		type: Sequelize.STRING,
	},
	lastname: { 
		    type: Sequelize.STRING,
        },
	email: {
		    type: Sequelize.STRING,
		},
	phone: {
		type: Sequelize.STRING,
	},
	address: {
		type: Sequelize.STRING,
	},
	datetry: {
		type: Sequelize.DATE,
	},
	state: {
		type: Sequelize.STRING,
	},
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return User;
}