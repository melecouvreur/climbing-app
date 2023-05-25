import {React, useState} from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import "../App.css"

function AccountSetUp() {

const [currentStep, setCurrentStep] = useState(1)
let {profile, setProfile, climbingCert, certifications, setCert, location, setLocation, days, setDays, daysOfWeek, setSelected, navigate} = useContext(UserContext)

const handleStepChange = () => {
  setCurrentStep((currentStep) => (currentStep + 1))
  console.log(currentStep)
}

const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setProfile((state) => ({
      ...state,
    [name]: value,}
    ))
    console.log(profile)
    }
  
  //Allows user to edit location inititally fetched via external geolocation api
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    e.preventDefault();
      }
    
  //Toggles checked/unchecked prop of selected days in 'daysOfWeek []'
  //pushes "checked days" in 'days []' via setDays()
  //'days []' => obj.req for setDBDays & getRecommendations function
  // NB - pushes value of name (string) in 'days []' only. 
  const handleDaysChange = (d) => {
    setSelected(d.selected = !d.selected)
    //console.log(daysOfWeek)
    //console.log(d.selected)
    setDays(daysOfWeek)
    console.log("days", days)
  }

  const handleCertChange = (c) => {
    setSelected(c.selected = !c.selected)
    //console.log(climbingCert)
    //console.log(c.selected)
    setCert(climbingCert)
    console.log("certifications", certifications)
  }

  const addNewUserInfo = async () => {
    try {
      const response = await fetch('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ 
          username: profile.username, 
          email: profile.email,
          location,
          level: profile.level, 
          gender: profile.gender,
          pronouns: profile.pronouns, 
          avatar: profile.avatar,
          bio: profile.bio
        }),
      });
  
      if (response.ok) {
        const { data } = await response.json();
        //setProfile(data);
        console.log(data);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
const addNewUserDays = async () => {
  try {
    const response = await fetch('/days', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ days }),
    });

    if (response.ok) {
      const { data } = await response.json();
      //setDays(data);
      console.log(data);
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.log(error);
  }
};

const addNewUserCert = async () => {
  try {
    const response = await fetch('/cert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ certifications }),
    });

    if (response.ok) {
      const { data } = await response.json();
      //setCert(data);
      console.log(data);
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.log(error);
  }
};

//fix e.preventDefault
const handleSubmit = (e) => {
    //e.preventDefault();
    addNewUserInfo()
    addNewUserDays()
    addNewUserCert()
    handleStepChange()
    setTimeout(() => {
    navigate("private/profile");
    }, 5000);  
  }

return (

<div className="bg-1 p-4 d-flex justify-content-center text-left">

<div>
      {currentStep === 1 && <StepOne onSubmit={handleStepChange} handleInputChangeCB={handleInputChange} handleLocationChangeCB={handleLocationChange} />}
      {currentStep === 2 && <StepTwo onSubmit={handleStepChange} handleInputChangeCB={handleInputChange}/>}
      {currentStep === 3 && <StepThree onSubmit={handleStepChange} handleDaysChangeCB={handleDaysChange}/>}
      {currentStep === 4 && <StepFour onSubmit={handleSubmit} handleCertChangeCB={handleCertChange}/>}
      {currentStep === 5 && (
        <div>
        <h3>Account created successfully!</h3>
        </div>
      )}
    </div>

    </div>
  );
}

export default AccountSetUp;
