export function loadHeader(containerId) {
  const filePath = "../components/header/header.html";
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load header: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      container.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading header:", error);
    });
}
