db.createUser({
 user: 'orders',
 pwd: '0rd3rs',
 roles: [{
     role: 'readWrite',
     db: 'data'
 }]
});