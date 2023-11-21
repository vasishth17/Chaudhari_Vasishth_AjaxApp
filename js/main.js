(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  // Functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  async function loadInfoBoxes() {
    try {
      const response = await fetch('https://swiftpixel.com/earbud/api/infoboxes');
      const infoBoxes = await response.json();

      infoBoxes.forEach((infoBox, index) => {
        const annotationContainer = document.getElementById(`hotspot-${index + 1}`);
        if (!annotationContainer) {
          console.error(`Annotation container #hotspot-${index + 1} not found`);
          return;
        }

        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;

        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;

        annotationContainer.appendChild(titleElement);
        annotationContainer.appendChild(textElement);
      });
    } catch (error) {
      console.error('Error fetching infoboxes:', error);
    }
  }



  async function loadMaterialInfo() {
    try {
      const response = await fetch('https://swiftpixel.com/earbud/api/materials');
      const materials = await response.json();

      materials.forEach(material => {
        const clone = materialTemplate.content.cloneNode(true);
        const materialHeading = clone.querySelector(".material-heading");
        const materialDescription = clone.querySelector(".material-description");

        materialHeading.textContent = material.heading;
        materialDescription.textContent = material.description;

        materialList.appendChild(clone);
      });
    } catch (error) {
      console.error('Error fetching material info:', error);
    }
  }

  function showInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 1 });
  }

  function hideInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 0 });
  }

  // Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Initial calls to load data
  loadInfoBoxes();
  loadMaterialInfo();

})();
