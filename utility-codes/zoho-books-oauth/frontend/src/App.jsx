import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [verified, setVerified] = useState(false);
  const [code,setCode] = useState(null);
  const [items, setItems] = useState([]);

  async function handleSignUp() {
    // Window features for the dialog box
    // const windowFeatures = 'width=500,height=500,modal=yes,alwaysRaised=yes';
    
    const url = "https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.KL5MD46IDPRU3S2UJP0MTKESTI6JRY&scope=ZohoBooks.fullaccess.all&redirect_uri=http://localhost:5173";
    window.location.href = url;
    
    // window.open(url,"_blank",windowFeatures)
  }

  async function handleShowItems() {
    const authResponse = await axios.post("http://localhost:8000/api/auth", {
      client_id: "1000.KL5MD46IDPRU3S2UJP0MTKESTI6JRY",
      client_secret: "9d4674d661f645411702bb6a2565f9e444c7f60e2a",
      redirect_uri: "http://localhost:5173",
      code: code,
    })

    const access_token = authResponse.data.access_token;

    const organizationResponse = await axios.post("http://localhost:8000/api/organization",{
      access_token: access_token
    })

    // const data = await axios.get("https://www.zohoapis.com/books/v3/organizations",config)
    console.log(organizationResponse.data.name);
  }

  useEffect(() => {
    if(window.location.href.includes("code")){
        //extract code from url
        setVerified(true);
        const searchParams = new URLSearchParams(window.location.search);
        console.log(searchParams.get("code"))
        setCode(searchParams.get("code"));
        // console.log(code);
    }
  }, []);


  return (
    <>
      {verified ? (
        <>
          {items.length > 0 ? (
            <>
              {items.map((item) => {
                return (
                  <div key={item.id}>
                    <h1>{item.name}</h1>
                  </div>
                );
              })}
            </>
          ) : 
            (<button onClick={handleShowItems}>Show Items</button>
          )}
          
        </>
      ) : (
        <div>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      )}
    </>
  );
}

export default App;
