function makeChanges(){
    const imgDiv = document.getElementById("imgContainer");
    const button = document.getElementById("btn");
    imgDiv.innerHTML = '<img src="Exp.jpg"></img>';
    button.style.backgroundColor="darkgreen";
    button.innerText="Button clicked!";
    button.style.color="whitesmoke";

}