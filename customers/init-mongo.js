db.createUser({
 user: 'customers',
 pwd: 'cust0m3rs',
 roles: [{
     role: 'readWrite',
     db: 'data'
 }]
});