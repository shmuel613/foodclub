db.createUser({
 user: 'restaurants',
 pwd: 'r3st4ur4nts',
 roles: [{
     role: 'readWrite',
     db: 'data'
 }]
});