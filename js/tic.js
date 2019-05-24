const table = document.querySelector("table");
table.addEventListener("click", () => {
	// Obtain the closest nested td on area clicked
	const td = event.target.closest('td');
 
 	// No nested td on area clicked will make td == null
	if (!td) return;
	
	td.style.backgroundColor = "red";
});