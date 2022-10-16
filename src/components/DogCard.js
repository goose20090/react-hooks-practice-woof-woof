import React  from "react";

function DogCard({dog, handlePatch}){

    // const [dogStatus, setDogStatus] = useState(dog.isGoodDog)

    function handleClick(){
        handlePatch(dog)
    }


  
    return(
        <>
            <img alt = "a dog" src = {dog.image}/>
            <h2>{dog.name}</h2>
            <button onClick = {handleClick}>{dog.isGoodDog? "Good Dog!": "Bad Dog!"}</button>
        </>
    )
}

export default DogCard;