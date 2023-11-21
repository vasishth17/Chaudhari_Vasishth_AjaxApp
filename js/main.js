(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialHeading = document.querySelector("#material-heading")
  const materialList = document.querySelector("#material-list");
  const spinner = `<svg id="custom-spinner" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#000000" stroke-width="3.55556" stroke-linecap="round"/>
</svg>


`;
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
    materialList.innerHTML = spinner;
    try {
      const response = await fetch('https://swiftpixel.com/earbud/api/materials');
      const materials = await response.json();
      materialList.innerHTML = "";

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
