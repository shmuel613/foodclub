db.createUser({
 user: 'menus',
 pwd: 'm3nus',
 roles: [{
     role: 'readWrite',
     db: 'data'
 }]
});