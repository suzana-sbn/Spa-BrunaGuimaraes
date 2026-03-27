
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1m7vuLYJ0idei1tcTK80eHnIvyq64uZA",
  authDomain: "spa-bruna.firebaseapp.com",
  projectId: "spa-bruna",
  storageBucket: "spa-bruna.firebasestorage.app",
  messagingSenderId: "469009711980",
  appId: "1:469009711980:web:aa9c890f197fd26dade949",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const services = [
  { name: "Spa Natural Experience (2h)", price: 380 },
  { name: "Spa Natural Essence (1h10min)", price: 280 },
  { name: "Spa Natural Harmony (50min)", price: 200 },
  { name: "Dreno Modeladora (50min)", price: 160 },
  { name: "Relaxante (50min)", price: 130 },
  { name: "Spa Passos Naturais (30min)", price: 80 }
];

export default function App(){
  const [name,setName]=useState("");
  const [service,setService]=useState(null);

  const save=async()=>{
    if(!name||!service) return alert("Preencha tudo");
    await addDoc(collection(db,"agendamentos"),{name,service:service.name,price:service.price});
    alert("Agendado!");
  }

  return (
    <div style={{padding:20,fontFamily:"Arial"}}>
      <h1>Spa Natural Bruna Guimarães 🌿</h1>

      <input placeholder="Seu nome" onChange={e=>setName(e.target.value)} />

      <div>
        {services.map(s=>(
          <button key={s.name} onClick={()=>setService(s)} style={{display:"block",margin:"5px 0"}}>
            {s.name} - R$ {s.price}
          </button>
        ))}
      </div>

      <button onClick={save}>Agendar</button>
    </div>
  )
}
