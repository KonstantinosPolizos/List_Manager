const list = document.querySelector(".final-list");
window.addEventListener("DOMContentLoaded", show_subscribers);
document.addEventListener("submit", show_subscribers);

document
  .querySelector(".form-container")
  .addEventListener("submit", add_subscriber);

function add_subscriber(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (username && email) {
    const body_data = JSON.stringify({
      subscriber: {
        EmailAddress: email,
        Name: username,
      },
    });

    axios
      .post("http://localhost:5000/api/list", body_data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function show_subscribers(e) {
  e.preventDefault();

  axios
    .get("http://localhost:5000/api/list")
    .then((resp) => {
      var data = resp.data;
      if (data) {
        Object.values(data).map((value) => {
          const element = document.createElement("article");
          element.classList.add("subscriber");
          element.innerHTML = `<h5 class="title">${value.Name}</h5>
          <p class="title">${value.EmailAddress}</p>
              <button type="button" class="delete-btn">
                delete
              </button>
            </div>
          `;
          // add event listeners to both buttons;
          const deleteBtn = element.querySelector(".delete-btn");
          deleteBtn.addEventListener("click", delete_subscriber);

          // append child
          list.appendChild(element);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function delete_subscriber(e) {
  e.preventDefault();

  var body_data = {
    EmailAddress: Object.values(e.path)[1].querySelector("p").innerHTML,
  };

  axios
    .post("http://localhost:5000/api/list/unsub", body_data)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.error(error);
    });
}
