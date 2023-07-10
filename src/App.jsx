import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from "./components/navigation/Navigation";
import Rank from "./components/rank/Rank";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm.jsx";
import FaceRecognition from "./components/facerecognition/FaceRecognition.jsx";
import Signin from "./components/signin/Signin.jsx";
import Register from "./components/register/Register.jsx";
import './App.css';


//CLARIFAI API FUNCTION
const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = 'cfd3d65baa38434a9653239d75e8ddd0';
  const USER_ID = 'assaf';       
  const APP_ID = 'my-first-application-7xw10k';
  const MODEL_ID = 'face-detection';  
  const IMAGE_URL = imageUrl;
  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions
}

//APPP


//APP STATES
class App extends Component {
  constructor() {
    super();
    this.state ={
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    }
  }


///FUNCTIONS
calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
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
  console.log(box)
  this.setState({ box: box });
}

onInputChange = (event) => {
  this.setState({ input: event.target.value });
}

onButtonSubmit = () =>{ 
  this.setState({imageUrl: this.state.input});
  fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(this.state.input))
  .then(response => response.json())
  .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
  .catch(error => console.log('error', error));
}

onRouteChange = (route) => {
  if (route === "signout") {
    this.setState({isSignedIn: false})
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
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        : (
            this.state.route === "signin"
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )  
      }
    </div>
    )
  }
}

export default App;
