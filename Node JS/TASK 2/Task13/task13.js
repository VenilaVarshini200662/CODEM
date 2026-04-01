const fs = require('fs').promises;
function fetchUserData(id){
  return new Promise((resolve, reject) => {
    console.log(`Fetching user ${id}...`);
    setTimeout(() => {
      if(id > 10) 
        reject(new Error('User ID too high'));
      else 
        resolve({id, name:'Arun', email:'arun@mail.com'});
    },400);
  });
}

function validateUser(user){
  return new Promise((resolve, reject) =>{
    console.log('Validating email...');
    setTimeout(() => {
      if 
      (!user.email.includes('@')) reject(new Error('Invalid email'));
      else 
        resolve(user);
    },200);
  });
}
function enrichUser(user){
  return new Promise((resolve) => {
    console.log('Enriching user data...');
    setTimeout(() =>{
      resolve({ ...user, role: 'admin', joinedAt: '2024-01-01' });
    },300);
  });
}

function saveUser(user,retry = true){
  console.log('Saving to users.json...');
  return fs.writeFile('users.json', JSON.stringify(user,null,2))
    .catch(err =>{
      if(retry){
        console.log('Save failed, retrying...');
        return saveUser(user, false);
      }
      throw err;
    });
}
const userId = 5;
fetchUserData(userId)
  .then(validateUser)
  .catch(err => {
    console.log('Validation failed, using default user...');
    return {id:userId,name:'Default',email:'default@mail.com' };
  })
  .then(enrichUser)
  .then(user => saveUser(user).then(() => user))
  .then(user => {
    console.log(`Done: {id: ${user.id}, name:"${user.name}", role:"${user.role}" }`);
  })
  .catch(err => console.error('Pipeline failed:',err));
