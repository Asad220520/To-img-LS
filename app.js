const imgInput = document.querySelector(".input");
const imgName = document.querySelector(".input2");
const btn = document.querySelector(".btn");
const table = document.querySelector("#tbody");
const img = document.querySelector(".img-preview");


function view() {
  const task = JSON.parse(localStorage.getItem("task")) || [];
  task.map((el) => {
    table.innerHTML += `
    <tr>
    <td><img src="${el.img}" /></td>
      <td>${el.title}</td>
      <td><button class="del-btn">DELETE</button></td>
    </tr>
    `;
  });
  delBtn()
}
view();

imgInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask()
  }
})
imgName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask()
  }
})


function addTask() {
  if (imgInput.value === '' ||imgName.value === '' ) {
    alert('Заполните поле ввода')
  }else{
    table.innerHTML = "";
    const task = JSON.parse(localStorage.getItem("task")) || [];
    const newTask = {
      id: task.length ? task[task.length - 1] : 1,
      img: img.src = imgInput.value,
      title: imgName.value,
    };
    const result = [...task, newTask];
    localStorage.setItem("task", JSON.stringify(result));
    view();
    imgInput.value = "";
    imgName.value = "";
    img.src = "";
  }
}


function delBtn() {
  let task = JSON.parse(localStorage.getItem("task")) || [];
  const buttons = document.querySelectorAll(".del-btn");
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      task = task.filter((el, idx) => {
        return idx !== index;
      });
      localStorage.setItem("task", JSON.stringify(task));
      table.innerHTML = "";
      view();
    });
  });
}

delBtn();
btn.addEventListener("click", addTask);
