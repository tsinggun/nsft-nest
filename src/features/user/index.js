import  fs from 'fs';

const user = {
  name: 'John',
  age: 30,
};

fs.writeFileSync('user.json', JSON.stringify(user));