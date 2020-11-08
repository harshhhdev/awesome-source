function filter() {
   const name = document.getElementById('filter-name')
   console.log(name)

   var filter = name.innerHTML.toUpperCase()
   
   let ul = document.getElementById("articles")
   let li = ul.getElementsByTagName('li')

   for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByClassName('card-date')[0]
      let txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}

filter()