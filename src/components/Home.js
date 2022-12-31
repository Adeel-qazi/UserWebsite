    //rafce
import Notes from './Notes'      //import Notes form Notes component 

const Home = (props) => {
  const {showAlert} = props;     //destructuring
 
return (
    <div>
    <Notes showAlert={showAlert}/>   {/* imported Notes component in Home component. and showing alert in home pafe*/}

    </div>
  )
}
    
export default Home
