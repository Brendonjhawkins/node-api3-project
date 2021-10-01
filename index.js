const server = require('./api/server.js');

const PORT = 4000

server.listen(PORT, () => {
  console.log('\n* Server Running on http://localhost:4000 *\n');
});
