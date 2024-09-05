let i = 0;
let arr = [];

document.getElementById("add").addEventListener("click", () => {
  let text = document.getElementById("text");

  if (text.value != "") {
    let elment = document.createElement("input");
    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let container = document.getElementById("picks");
    let picks = document.createElement("div");
    picks.classList.add("m-2", "row");
    picks.id = "pick" + i.toString();

    elment.classList.add("rounded", "col-lg-6", "col-5", "ip");
    elment.value = text.value;
    elment.id = "im" + i.toString();
    elment.setAttribute("readonly", "");
    delBtn.classList.add("btn", "btn-danger", "col-3", "mx-1");
    delBtn.id = "delete" + i.toString();
    delBtn.textContent = "Delete";
    editBtn.classList.add("btn", "btn-success", "col-lg-2", "col-3", "mx-1");
    editBtn.id = "edit" + i.toString();
    editBtn.textContent = "Edit";
    delBtn.addEventListener("click", () => {
      if (delBtn.textContent == "Sure ?") {
        arr.splice(arr.indexOf(elment.value), 1);
        picks.remove();
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
        text.focus();
        editBtn.textContent = "Edit";
      }
    });
    picks.appendChild(elment);
    picks.appendChild(editBtn);
    picks.appendChild(delBtn);

    container.appendChild(picks);
    arr[i] = text.value;

    text.value = "";

    i++;
    text.focus();
  } else {
    let ans = document.getElementById("answer");
    ans.classList.add("text-danger");
    ans.textContent = "Please Enter a value to add";
  }
});

document.getElementById("submit").addEventListener("click", () => {
  let ans = document.getElementById("answer");
  ans.classList.remove("text-danger");
  ans.textContent =
    "Random Element is : " + arr[Number.parseInt(Math.random() * arr.length)];
});
