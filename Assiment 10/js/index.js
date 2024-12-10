var links = JSON.parse(localStorage.getItem('bookmarks')) || [];

// Function to save links array to Local Storage
function saveToLocalStorage() {
   localStorage.setItem('bookmarks', JSON.stringify(links));
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;  // Name validation (at least 3 characters, possibly followed by spaces and more words)
var regexURL = /^(https?:\/\/)?(www\.)?\w+\.\w{2,}(:\d{2,5})?(\/\w+)*$/;  // URL validation (with optional components like www, port, path)

// Function to add a new link
function addLink() {
   // Get input values
   var siteName = document.getElementById('bookmarkName').value;
   var siteURL = document.getElementById('bookmarkURL').value;

   // Validate inputs
   if (siteName === "" || siteURL === "") {
      document.getElementById('overLay').classList.remove('d-none');
      return;
   }

   if (nameRegex.test(siteName) && regexURL.test(siteURL)) {
      // Add the new link to the array
      links.push({ name: siteName, url: siteURL });

      // Save to Local Storage
      saveToLocalStorage();

      // Clear inputs
      document.getElementById('bookmarkName').value = "";
      document.getElementById('bookmarkURL').value = "";

      // Update the table
      display();
   } else {
      document.getElementById('overLay').classList.remove('d-none');
   }
}

// Function to close the overlay
function closeBtn() {
   document.getElementById('overLay').classList.add('d-none');
}

// Function to display all bookmarks
function display() {
   var tableContent = document.getElementById('tableContent');
   tableContent.innerHTML = ""; // Clear the table

   // Loop through links array and display each link
   for (var i = 0; i < links.length; i++) {
      tableContent.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${links[i].name}</td>
                <td>
                    <a href="${links[i].url}" target="_blank" class="btn btn-warning">
                        <i class="fa-solid fa-eye"></i> Visit
                    </a>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteLink(${i})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
   }
}

// Function to delete a link
function deleteLink(index) {
   // Remove the link from the array
   links.splice(index, 1);

   // Save the updated array to Local Storage
   saveToLocalStorage();

   // Update the table
   display();
}

// Display bookmarks on page load
display();

function validateForm(element) {
   // Check if the element is for a name input
   if (element.id === "bookmarkName") {
      if (nameRegex.test(element.value)) {
         element.classList.add("is-valid");
         element.classList.remove("is-invalid");
         return true;
      } else {
         element.classList.add("is-invalid");
         element.classList.remove("is-valid");
         return false;
      }
   }

   // Check if the element is for a URL input
   if (element.id === "bookmarkURL") {
      if (regexURL.test(element.value)) {
         element.classList.add("is-valid");
         element.classList.remove("is-invalid");
         return true;
      } else {
         element.classList.add("is-invalid");
         element.classList.remove("is-valid");
         return false;
      }
   }
}
