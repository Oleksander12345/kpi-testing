const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const tabPanels = document.querySelectorAll(".tab-panel");

function activateTab(activeButton) {
  tabButtons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === activeButton.dataset.tab;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => activateTab(button));

  button.addEventListener("keydown", (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabButtons.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabButtons.length - 1;
    }

    tabButtons[nextIndex].focus();
    activateTab(tabButtons[nextIndex]);
  });
});

if (tabButtons.length > 0) {
  activateTab(tabButtons.find((button) => button.classList.contains("active")) || tabButtons[0]);
}

const demoButton = document.getElementById("demoButton");
const buttonStatus = document.getElementById("buttonStatus");

demoButton?.addEventListener("click", () => {
  buttonStatus.textContent = "Кнопка працює ✓";
});
