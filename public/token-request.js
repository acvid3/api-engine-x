document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");

  // Описание использования API
  const description = document.createElement("p");
  description.textContent =
    "Enter the application's name and submit to receive your unique token.";
  root.appendChild(description);

  // Форма для отправки запроса
  const form = document.createElement("form");
  form.className = "form-container";

  const appNameLabel = document.createElement("label");
  appNameLabel.textContent = "appName: ";
  form.appendChild(appNameLabel);

  const appNameInput = document.createElement("input");
  appNameInput.className = "text-input";
  appNameInput.type = "text";
  appNameInput.value = "TestApp";
  appNameInput.id = "appNameInput";
  form.appendChild(appNameInput);

  const submitButton = document.createElement("button");
  submitButton.className = "submit-button";
  submitButton.type = "submit";
  submitButton.textContent = "Request Token";
  form.appendChild(submitButton);

  root.appendChild(form);

  // Контейнер для отображения деталей ответа
  const responseContainer = document.createElement("div");
  responseContainer.className = "response-container";
  root.appendChild(responseContainer);

  // Функция для отображения JSON в виде дерева
  function displayJsonTree(jsonObject, container) {
    const jsonString = JSON.stringify(jsonObject);
    const brace = { brace: 0 };

    const formattedString = jsonString.replace(
      /({|}[,]*|[^{}:]+:[^{}:,]*[,{]*)/g,
      (m, p1) => {
        const returnFunction = () =>
          `<div style="text-indent: ${brace["brace"] * 20}px;">${p1}</div>`;
        let returnString = 0;
        if (p1.lastIndexOf("{") === p1.length - 1) {
          returnString = returnFunction();
          brace["brace"] += 1;
        } else if (p1.indexOf("}") === 0) {
          brace["brace"] -= 1;
          returnString = returnFunction();
        } else {
          returnString = returnFunction();
        }
        return returnString;
      }
    );

    container.innerHTML = formattedString;
  }

  // Обработчик отправки формы
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const appName = appNameInput.value;
    fetch("/api/auth/generate-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appName }),
    })
      .then((response) => {
        const status = response.status;
        return response.json().then((data) => ({ status, data }));
      })
      .then(({ status, data }) => {
        responseContainer.innerHTML = `<strong>Status:</strong> ${status}<br>`;
        displayJsonTree(data, responseContainer);
      })
      .catch((error) => {
        console.error("Error:", error);
        responseContainer.textContent = `Error: ${error.message}`;
      });
  });
});
