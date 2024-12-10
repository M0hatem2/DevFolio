// async function getPost(userId) {
//    var request = new XMLHttpRequest();
//    request.open('GET', 'https://jsonplaceholder.typicode.com/posts?userId=' + userId);
//    request.responseType = 'json'; // Set the response type to JSON
//    request.send();

//    request.onload = function () {
//       var posts = request.response; // Array of posts
//       console.log(posts); // Log the full response

//       var container = document.getElementById('posts'); // Get the posts container
//       container.innerHTML = ''; // Clear any existing content

//       for (let post of posts) {
//          // Append each post to the container
//          container.innerHTML += `
//             <div class="post">
//                <h2>${post.title}</h2>
//                <p>${post.body}</p>
//             </div>
//          `;
//       }
//    };
// }

// async function getUsers() {
//    var request = new XMLHttpRequest();
//    request.open('GET', 'https://jsonplaceholder.typicode.com/users');
//    request.responseType = 'json'; // Set the response type to JSON
//    request.send();

//    request.onload = function () {
//       var users = request.response; // Array of users
//       console.log(users); // Log the full response

//       var container = document.getElementById('users'); // Get the users container
//       container.innerHTML = ''; // Clear any existing content

//       for (let user of users) {
//          // Append each user to the container with a clickable link
//          container.innerHTML += `
//             <a class="text-decoration-none text-black" href="#" onclick="handleUserClick(event, ${user.id})">
//                <div class="user my-3 selected">${user.name}</div>
//             </a>
//          `;
//       }
//    };
// }

// function handleUserClick(event, userId) {
//    event.preventDefault(); // Prevent the default link behavior
//    getPost(userId); // Fetch posts for the selected user
// }

// // Fetch users when the page loads
// getUsers();

async function getPosts(userId) {
   var request = new XMLHttpRequest()
   request.open("GET", 'https://jsonplaceholder.typicode.com/posts?userId=' + userId);
   request.responseType = "json";
   var posts;
   request.send();
   request.onload = function () {
      var posts = request.response;
      console.log(posts);
      var container = "";
      for (let post of posts) {
         container += `
                                       <div class="post">
                                                <h2>${post.title}</h2>
                                                <p>${post.body}</p>
                                       </div>
      `}
      document.getElementById('posts').innerHTML = container;
   }
}

async function getUsers() {
   var request = new XMLHttpRequest();
   request.open('GET', 'https://jsonplaceholder.typicode.com/users');
   request.responseType = 'json';
   request.send();
   request.onload = function () {
      var users = request.response;
      var container = '';
      for (let user of users) {
         container +=
            ` <a class="text-decoration-none text-black" href="#">
               <div onclick="handleUserClick(${user.id})" class="user my-3 selected">
                  ${user.name}
               </div>
            </a>
         `
      }
      document.getElementById('users').innerHTML = container;
   };
}
function handleUserClick(userId) {
   getPosts(userId);
   // window.alert(userId)
}
getUsers()