db.createUser({
 user: 'hours',
 pwd: 'h0urs',
 roles: [{
     role: 'readWrite',
     db: 'data'
 }]
});