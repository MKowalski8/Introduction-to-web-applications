const mainlist = document.createElement('ul');
const no_sorted_list = document.createElement('ul');

mainlist.setAttribute('id', 'mainlist')

fetch ("https://dummyjson.com/products")
.then(x => x.json())
.then(x => {
    // console.log(x);
 
    for (let i = 0; i < 30; i++){
        const newlist = document.createElement('li');
        mainlist.appendChild(newlist);
        
        
        let name = document.createElement('p')
        name.setAttribute('class', 'name')
        name.appendChild(document.createTextNode(`${x.products[i].title}`));
        newlist.appendChild(name);

        let description = document.createElement('p')
        description.setAttribute('id', 'description')
        description.appendChild(document.createTextNode(`${x.products[i].description}`));
        newlist.appendChild(description);
        
        let photo = document.createElement('img');
        photo.setAttribute('src', x.products[i].thumbnail)
        newlist.appendChild(photo);
        newlist.appendChild(document.createElement('br'));
        newlist.appendChild(document.createElement('br'));
        newlist.appendChild(document.createElement('br'));
        no_sorted_list.appendChild(newlist.cloneNode(true));
    }
    document.querySelector('div').insertAdjacentElement('beforeend', mainlist)
})
.catch(error => console.log(error))

let sort_counter = 1;

function sortData() {
    let list, i, switching, shouldSwitch, dir;
    switching = true;
    
    let names = document.getElementsByClassName("name");
    let lists_to_switch = mainlist.getElementsByTagName("li");

    // console.log(no_sorted_list);
    // console.log(mainlist);

    if (sort_counter == 0){
        let const_list = no_sorted_list.getElementsByTagName("li");
        
        for (i = 0; i < (lists_to_switch.length); i++){
            lists_to_switch[i].innerHTML = const_list[i].innerHTML;
        }          
        sort_counter = 1;
        document.getElementById('sortButton').innerHTML = 'Sortuj asc';
    }

    else {
        while (switching) {
            switching = false;
            // console.log(sort_counter);
        
            for (i = 0; i < (lists_to_switch.length - 1); i++) {
                    shouldSwitch = false;
                    
                    if (sort_counter == 1 && names[i].innerHTML.toLowerCase() > names[i + 1].innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    } 
                    
                    else if(sort_counter == 2 && names[i].innerHTML.toLowerCase() < names[i + 1].innerHTML.toLowerCase()){
                        shouldSwitch = true;
                        break;
                    }
            }
            
            if (shouldSwitch) {
                lists_to_switch[i].parentNode.insertBefore(lists_to_switch[i + 1], lists_to_switch[i]);
                switching = true;
            } 
            // console.log(10)
        }
        if (sort_counter == 1){
            sort_counter = 2
            document.getElementById('sortButton').innerHTML = 'Sortuj dsc';
        } else {
            sort_counter = 0
            document.getElementById('sortButton').innerHTML = 'Bez sortowania';
        } 
    }
}   

let is_filtered = false;

function filterData(){
    let names = document.getElementsByClassName("name");
    let lists_to_filter = mainlist.getElementsByTagName("li");
    if (is_filtered == true) {
        for (i = 0; i < (lists_to_filter.length); i++){
            lists_to_filter[i].setAttribute('style', 'display: ;');
        }
        is_filtered = false;
        document.getElementById('filterButton').innerHTML = 'Filtruj dane'
    }     
        

    else {
        let input = prompt("Wpisz szukany produkt:")
        for (i = 0; i < (lists_to_filter.length); i++){
            if (!names[i].innerHTML.toLowerCase().includes(input)) {
            lists_to_filter[i].setAttribute('style', 'display: none;');
            }
            // console.log(names[i].innerHTML.toLowerCase())
        }   
        is_filtered = true;
        document.getElementById('filterButton').innerHTML = 'Odfiltruj dane'
    }
    // console.log(is_filtered)

}