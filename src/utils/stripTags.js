const stripTags = htmlString => {
  const tempElement = document.createElement("DIV");
  tempElement.innerHTML = htmlString;
  return tempElement.textContent || tempElement.innerText || "";
};

export default stripTags;
