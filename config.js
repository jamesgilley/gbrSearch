//

module.exports = {
	APPNAME: process.env.APPNAME || 'App Template',
  DEVMODE: (process.env.NODE_ENV != 'production'),
};
