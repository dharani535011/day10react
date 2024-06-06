import axios from 'axios'
import React, {  useEffect, useState } from 'react'


const About = () => {

    const [date,setdate]=useState("")
    const [about,setabout]=useState("")
    const [ids,setids]=useState("")
    const [buttonadd,setbuttonadd]=useState(true)
    const [buttonokk,setbuttonokk]=useState(false)
    const handledate=async()=>{
    await axios.post("https://66613fd663e6a0189fe90160.mockapi.io/about",{date:date,about:about})
     
    }



   
      const [items,setitems]=useState([])
      useEffect(async ()=>{
       const res=await axios.get("https://66613fd663e6a0189fe90160.mockapi.io/about")
       setitems(res.data)
},[])
     const handledelete=async(id)=>{
        await axios.delete(`https://66613fd663e6a0189fe90160.mockapi.io/about/${id}`)
           useEffect()  
    }
     const handledit=async (id)=>{
       setbuttonokk(true)
       setbuttonadd(false)
      const val=await axios.get(`https://66613fd663e6a0189fe90160.mockapi.io/about/${id}`)
          setabout(val.data.about)
          setids(id)
     }
     const handleditt=async (e)=>{
        setbuttonokk(false)
        setbuttonadd(true)
        const id=e.target.value
        await axios.put(`https://66613fd663e6a0189fe90160.mockapi.io/about/${id}`,{date:date,about:about})
     }
  return (
    <>
  <div className="input"><input required type="date" placeholder="Date" value={date} onChange={(e)=>setdate(e.target.value)}/>
    <textarea required type="text" placeholder="Write About Day..." value={about} onChange={(e)=>setabout(e.target.value)}/>
    <button style={{display:buttonadd?"block":"none"}} onClick={handledate}>ADD</button>   
    <button style={{display:buttonokk?"block":"none"}} value={ids} onClick={(e)=>handleditt(e)}>OKK</button>   
    </div>
    <div className='container'>
        {items.map((item)=>(
       <div className='box' key={item.id}> <h3>Date: {item.date}</h3>
        <p><h2>Description:</h2> {item.about}</p>
        <button onClick={()=>handledit(item.id)}>EDIT</button>
        <button onClick={()=>handledelete(item.id)}>DELETE</button>
        </div>
    ))}</div></>
  )
}

export default About