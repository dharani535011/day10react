import axios from 'axios'
import React, {  useEffect, useState } from 'react'


const About = () => {

    const [date,setdate]=useState("")
    const [about,setabout]=useState("")
    const [ids,setids]=useState("")
    const [buttonadd,setbuttonadd]=useState(true)
    const [buttonokk,setbuttonokk]=useState(false)
    const [items,setitems]=useState([])
    const handledate=async()=>{
    await axios.post("https://66613fd663e6a0189fe90160.mockapi.io/about",{date:date,about:about})
    const newItemResponse = await axios.get("https://66613fd663e6a0189fe90160.mockapi.io/about");
    setitems([...items, newItemResponse.data]);
    setdate("");
    setabout("");
    fetchData()
    }

    const fetchData =async ()=>{
        const res=await axios.get("https://66613fd663e6a0189fe90160.mockapi.io/about")
        setitems(res.data)
         }

   
      
      useEffect( ()=>{
      fetchData()
        },[])
     const handledelete=async(id)=>{
        await axios.delete(`https://66613fd663e6a0189fe90160.mockapi.io/about/${id}`)
        const add=items.filter(item => item.id !== id)
        setitems(add); 
        fetchData()
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
        setitems(items.map(item => {
            if (item.id === id) {
                return { ...item, date: date, about: about };
            }
            return item;
        }));
     }
  return (
    <>
  <div className="input"><input required type="date" placeholder="Date" value={date} onChange={(e)=>setdate(e.target.value)}/>
    <textarea required type="text" placeholder="Write About your Day..." value={about} onChange={(e)=>setabout(e.target.value)}/>
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