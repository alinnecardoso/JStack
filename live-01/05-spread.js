const user = {
  firstName: 'Alinne',
  lastName: 'Martins',
  age: 19,
  instagram: '@_alinnemartins_',
  skills: ['Back-end', 'Front=end', 'Mobile', 'UX/UI'],
  active: false,
};

// spread (espalhar) operator
const updatedUser = {
  ...user,
  skills: [...user.skills, 'Marketing'],
  active: true,
}

console.log({user});
console.log({updatedUser})