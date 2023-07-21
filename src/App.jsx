import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from "./components/navigation/Navigation";
import Rank from "./components/rank/Rank";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";
import './App.css';

// INITIAL START

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}


//APP STATES

class App extends Component {
    constructor() {
      super();
      this.state = {
        input: "",
        imageUrl: "",
        box: {},
        route: "signin",
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: '',
        }
      }
    }
  


///FUNCTIONS

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined,
  }})
}

calculateFaceLocation = (array) => {
  const clarifaiFace = array.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById("inputImage")
  const width = Number(image.width);
  const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
}

displayFaceBox = (box) => {
  this.setState({ box: box });
}

onInputChange = (event) => {
  this.setState({ input: event.target.value });
}

onButtonSubmit = () => { 
  this.setState({imageUrl: this.state.input});
  fetch('http://localhost:3000/imageurl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({input: this.state.input})
  })
  .then(response => response.json())
  .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: this.state.user.id })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })  
        }
      this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(error => console.log('error', error))
}

onRouteChange = (route) => {
  if (route === "signin") {
    this.setState(initialState)
  } else if (route === "home") {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

//COMPONENTS
render() {
  return (
    <div>
      <ParticlesBg className="particles" type="cobweb" bg={true} />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      { this.state.route === "home" 
        ? <div>   
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        : (
            this.state.route === "signin"
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )  
      }
    </div>
    )
  }
}

export default App;
