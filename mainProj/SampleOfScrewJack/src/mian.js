
let responeOfOrign = () => {
    label = document.getElementById('originLabel');
    if(label.style.display == "block"){
        label.style.display = "none"
    }else{
        label.style.display = "block"
    }
}

let responeOfPart = (e) =>{
    // console.log(e)
    if(e.style.display == 'none'){
        e.style.display = 'block'
    }else{
        e.style.display = 'none'
    }
}