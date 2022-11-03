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

