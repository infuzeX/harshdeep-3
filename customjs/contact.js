const forms = document.querySelectorAll('.form');
let inputs, type = null;
console.log(forms)

forms.forEach((form) => {

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {};
    type = form.id;
    inputs = e.target.elements;
    formData['type'] = type;
    for (let i = 0; i < (inputs.length - 1); i++) {
      const { name, value } = inputs[i];
      formData[name] = value;
    }
    console.log(formData);
    sendData(formData);
  });

});

function sendData(formData) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${window.location.origin}/php/form.php`, true);
  xhr.onload = function () {
    const res = JSON.parse(this.responseText);
    if (res.success) {
      clearfield(inputs);   
    }
    handleStatus('SUCCESS', res.message)
  };
  xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  console.log(JSON.stringify(formData));
  xhr.send(JSON.stringify(formData));
}

function clearfield(elements) {
  for (let x = 0; x < elements.length; x++) {
    elements[x].value = "";
  }
}

function handleStatus(type, msg) {
  const notify = document.querySelector('.notify');
  //notify.style.background = color[type];
  notify.style.display = "block";
  notify.innerHTML =`<span>${msg}</span>`;
  setTimeout(()=> {
      notify.style.display = "none"
    notify.innerHTML = '';
  }, 2500)
}