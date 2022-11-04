const check = document.querySelectorAll(".input");

for (var i = 0; i < check.length; i++) {
  check[i].addEventListener("click", handleClick);

  function handleClick() {
    if (
      this.parentElement.style.background === "rgba(221, 247, 232, 0.37)" ||
      this.parentElement.lastElementChild.style.display === "block" ||
      this.parentElement.getElementsByTagName("p")[2].style.display === "none"
    ) {
      this.parentElement.style.background = "white";
      this.parentElement.lastElementChild.style.display = "none";
      this.parentElement.getElementsByTagName("p")[2].style.display = "block"
    } else {
      this.parentElement.style.background = "rgba(221, 247, 232, 0.37)";
      this.parentElement.lastElementChild.style.display = "block";
      this.parentElement.getElementsByTagName("p")[2].style.display = "none"
    }
  }
}




// Pagination starts here

/* Declaring variables. */
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

/* This is the code that is responsible for the pagination. It is setting the number of items per page
to 10, and then it is calculating the number of pages based on the number of items in the list. It
is also setting the current page to 1. */
const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

/**
 * Add the class 'disabled' to the button and set the attribute 'disabled' to true.
 * @param button - The button you want to disable.
 */
const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

/**
 * Remove the disabled class and the disabled attribute from the button.
 * @param button - The button you want to enable.
 */
const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};


/**
 * If the current page is 1, disable the previous button, otherwise enable it. If the current page is
 * the last page, disable the next button, otherwise enable it.
 */
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

/**
 * It removes the active class from all the pagination buttons, then adds the active class to the
 * button that matches the current page.
 */
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

/**
 * This function creates a button element, assigns it a class name, assigns it an innerHTML value,
 * assigns it an attribute, and then appends it to the paginationNumbers element.
 * @param index - The index of the page number.
 */
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

/**
 * It loops through the number of pages and appends a page number to the pagination div.
 */
const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

/**
 * It takes a page number as an argument, sets the current page to that number, handles the active page
 * number, handles the page buttons status, and then loops through the list items and hides all of them
 * except for the ones that are in the current page range.
 * @param pageNum - The page number that you want to set as the current page.
 */
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

/* Adding an event listener to the window object. When the window loads, it will call the
getPaginationNumbers() function, which will loop through the number of pages and append a page
number
to the pagination div. It will also call the setCurrentPage() function and pass 1 as an argument.
This
will set the current page to 1, handle the active page number, handle the page buttons status, and
then
loop through the list items and hide all of them except for the ones that are in the current page
range.

It will also add an event listener to the previous button. When the previous button is clicked, it
will
call the setCurrentPage() function and pass the current page minus 1 as an argument. This will set
the
current page to the previous page, handle the active page number, handle the page buttons status,
and
then loop through the list items and hide all of them except for the ones that are in the current
page
range.

It will also add an event listener to the next button. When the next button is clicked, it will */
window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});