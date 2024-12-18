let i = 0;
let arr = [];
let hasChanges = false;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("random_picker_tasks_token") == null) {
    localStorage.setItem("random_picker_tasks_token", JSON.stringify([]));
  }

  let saved_tasks = JSON.parse(
    localStorage.getItem("random_picker_tasks_token")
  );
  arr = saved_tasks;
  for (let index = 0; index < saved_tasks.length; index++) {
    add(saved_tasks[index]);
  }
});

window.addEventListener("beforeunload", (event) => {
  if (hasChanges) {
    event.preventDefault();
  }
});

document.getElementById("add").addEventListener("click", () => {
  add(null);
  hasChanges = true;
});

document.getElementById("save").addEventListener("click", () => {
  localStorage.setItem("random_picker_tasks_token", JSON.stringify(arr));
  hasChanges = false;
  let ans = document.getElementById("answer");
  ans.classList.remove("text-danger");
  ans.textContent = "Loading...";
  setTimeout(() => {
    ans.textContent = "saved";
  }, 400);
});
document.getElementById("submit").addEventListener("click", () => {
  let ans = document.getElementById("answer");
  if (arr.length == 0) {
    ans.classList.add("text-danger");
    ans.textContent = "Add elements to show";
  } else {
    ans.classList.remove("text-danger");
    ans.textContent = "Loading...";
    setTimeout(() => {
      ans.textContent =
        "Random Task to do is : " +
        arr[Number.parseInt(Math.random() * arr.length)];
    }, 400);
  }
});

const add = (str) => {
  let text = document.getElementById("text");
  textVal = text.value;
  if (str != null) {
    textVal = str;
  }

  if (textVal != "") {
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.id = "check" + i.toString();
    check.classList.add("col-1", "me-1", "form-check-input");
    let elment = document.createElement("input");
    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let container = document.getElementById("picks");
    let picks = document.createElement("div");
    picks.classList.add("m-2", "row");
    picks.id = "pick" + i.toString();

    elment.classList.add("rounded", "col-lg-6", "col-4", "ip", "me-1");
    elment.value = textVal;
    elment.id = "im" + i.toString();
    elment.setAttribute("readonly", "");
    delBtn.classList.add("btn", "btn-danger", "col-3");
    delBtn.id = "delete" + i.toString();
    delBtn.textContent = "Delete";
    editBtn.classList.add("btn", "btn-success", "col-lg-2", "col-3", "me-1");
    editBtn.id = "edit" + i.toString();
    editBtn.textContent = "Edit";

    check.addEventListener("click", () => {
      if (elment.classList.contains("strike")) {
        elment.classList.remove("strike");
        arr[i] = elment.value;
        i++;
      } else {
        arr.splice(arr.indexOf(elment.value), 1);
        i--;

        elment.classList.add("strike");
      }
      hasChanges = true;
    });

    delBtn.addEventListener("click", () => {
      if (delBtn.textContent == "Sure ?") {
        arr.splice(arr.indexOf(elment.value), 1);
        i--;
        picks.remove();
        hasChanges = true;
      } else {
        delBtn.textContent = "Sure ?";
      }
    });
    delBtn.addEventListener("blur", () => {
      delBtn.textContent = "Delete";
    });
    editBtn.addEventListener("click", () => {
      if (editBtn.textContent === "Edit") {
        pre = elment.value;
        elment.removeAttribute("readonly");
        elment.focus();
        editBtn.textContent = "OK?";
      } else {
        arr.splice(
          arr.findIndex((k) => k === pre),
          1,
          elment.value
        );
        elment.setAttribute("readonly", "");

        editBtn.textContent = "Edit";
        text.focus();
      }
      hasChanges = true;
    });
    picks.appendChild(check);
    picks.appendChild(elment);
    picks.appendChild(editBtn);
    picks.appendChild(delBtn);

    container.appendChild(picks);
    arr[i] = textVal;

    text.value = "";

    i++;
    text.focus();
  } else {
    let ans = document.getElementById("answer");
    ans.classList.add("text-danger");
    ans.textContent = "Please Enter a value to add";
  }
};
