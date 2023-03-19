
const limit = 20;
const usersUrl = `https://jsonplaceholder.typicode.com/users`
const servicesUrl = `https://jsonplaceholder.typicode.com/comments?_limit=${limit}`;
const postsUrl = `https://jsonplaceholder.typicode.com/posts`;


async function getServices(){
  const request = await fetch(servicesUrl);
  const result = request.json();
  return result;
}

async function getPosts(){
  const request = await fetch(postsUrl);
  const result = request.json();
  return result;

}
async function getUsers(){
  const request = await fetch(usersUrl);
  const result = request.json();
  return result;

}


export {getServices, getPosts, getUsers};
