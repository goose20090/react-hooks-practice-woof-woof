import React, {useEffect, useState} from "react";
import DogCard from "./DogCard";

function App() {

  //Master List of all fetched Dogs

  const [allDogs, setAllDogs]= useState([])

  // List of Dogs to currently display on Bar

  const [barDogs, setBarDogs] = useState([])

  // Current Dog on Display

  const [currentDog, setCurrentDog] = useState({})

  //Boolean Value of Filter

  const [filterStatus, setFilterStatus] = useState(false)


  // Initial fetch on page load

  useEffect(()=>{
    fetch('http://localhost:3001/pups')
    .then(res=> res.json())
    .then((fetchedDogs)=> {
      console.log(fetchedDogs)
      // setting all dogs to master list
      setAllDogs(fetchedDogs)
      // as default value for filter is false, setting all dogs as bar dogs
      setBarDogs(fetchedDogs)
      // setting first dog as default dog on page load
      setCurrentDog(fetchedDogs[0])
    })
  }, [])

  // Display clicked Dog in DogCard component

  function handleClick(e){
    let clickedDog = e.target.textContent
    let clickedDogObj = barDogs.find((dog)=> clickedDog === dog.name)
    setCurrentDog(clickedDogObj)

  }

  // update new isGoodDog Status to json server

  function handlePatch(updatedDog){
      let newDogStatus = !updatedDog.isGoodDog

      fetch(`http://localhost:3001/pups/${updatedDog.id}`,{
          method: "PATCH",
          headers:{
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              isGoodDog: newDogStatus
          })
      })
      .then(res=> res.json())
      .then(res=> {
        console.log(res)

  //update DogCard with newStatus

        setCurrentDog(res)

  //update patched Dog to master list

        let newDogsArr = allDogs.map((iteratedDog)=>{
          if (iteratedDog.id === res.id){
            return res
          }
          else{
            return iteratedDog
          }
        })
        setAllDogs(newDogsArr)


      // update dogBar if filterStatus is on

      if (filterStatus){
        console.log(filterStatus)
        let newBarDogsArr = newDogsArr.filter((dog)=> dog.isGoodDog)
        setBarDogs(newBarDogsArr)
        setCurrentDog(newBarDogsArr[0])
      }

      })

 


    }

    function handleFilter(e){
      if (filterStatus){
        setBarDogs(allDogs)
        setFilterStatus(filterStatus=> !filterStatus)
        setCurrentDog(allDogs[0])
      }

      else{
        let newDogsArr = allDogs.filter((dog)=> dog.isGoodDog)
        setBarDogs(newDogsArr)
        setFilterStatus((filterStatus)=> !filterStatus)
        setCurrentDog(newDogsArr[0])
      }
    }
  
  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilter}>Filter good dogs: {filterStatus? "ON": "OFF"}</button>
      </div>
      <div id="dog-bar">
        {barDogs.map((dog)=><span key={dog.id} onClick = {handleClick}>{dog.name}</span>)}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <DogCard dog = {currentDog} handlePatch = {handlePatch}></DogCard>
        </div>
      </div>
    </div>
  );
}

export default App;
