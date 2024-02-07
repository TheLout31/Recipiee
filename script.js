const searchInput = document.querySelector(".input");
const URL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian";
const parentElement = document.querySelector("section");
let searchValue = "";
const getRecipies = async () => {
  try {
    const { data } = await axios.get(URL);
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

const recipes = await getRecipies(URL);

const createElement = (element) => {
  return document.createElement(element);
};

const createRecipeCard = (recipe) => {
  
  for (let item of recipe) {
    // creating card element
    const cardContainer = createElement("article");
    cardContainer.classList.add("main_Card");
    //image container
    const imgContainer = createElement("div");
    imgContainer.classList.add("img-container");

    //image element
    const imageEle = createElement("img");
    imageEle.classList.add("card-img-top");
    imageEle.setAttribute("src", item.strMealThumb);
    imageEle.setAttribute("alt", item.strMeal);

    //card Details

    const cardDetails = createElement("div");
    cardDetails.classList.add("card-body");

    //card Details

    const para = createElement("p");
    para.classList.add("card-text");
    para.innerText = item.strMeal;

    imgContainer.appendChild(imageEle);
    cardDetails.appendChild(para);
    cardContainer.appendChild(imgContainer);
    cardContainer.appendChild(cardDetails);
    parentElement.appendChild(cardContainer);
  }
};

function handleSearch(event) {
  let SearchedArray = [];
  searchValue = event.target.value.toLowerCase();
  console.log(searchValue);
  SearchedArray =
    searchValue?.length > 0
      ? recipes.filter((item) =>
          item.strMeal.toLowerCase().includes(searchValue)
        )
      : recipes;
  parentElement.innerHTML = "";
  createRecipeCard(SearchedArray)
}

searchInput.addEventListener("keyup", handleSearch);

createRecipeCard(recipes)


