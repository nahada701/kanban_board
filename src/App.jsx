
import { useState } from 'react'
import './App.css'

function App() {

  const TODO="TODO"
  const DOING="DOING"
  const DONE="DONE"


  const [inpValue,setInpValue]=useState("")
  const [tasks,setTasks]=useState([])
  const [dragTask,setDragTask]=useState(null)
  const [updateTask,setUpdateTask]=useState(null)

  console.log(inpValue);
  

  const handleAddTask=(e)=>{
    if(e.keyCode==13 && inpValue!==""){
      if(updateTask){
        const obj={
          title:inpValue,
          id:updateTask.id,
          status:updateTask.status
        }
        let copyTask=[...tasks]
        copyTask=copyTask.filter(item=>item.id!==updateTask.id)
        setTasks([...copyTask,obj])
        setUpdateTask(null)
      }
      else{
        const obj={
          title:inpValue,
          status:TODO,
          id:Date.now()
        }
     
        setTasks([...tasks,obj])
      }
      
      setInpValue("")
    }
    
  }
  

  const handleDrag=(e,task)=>{
 
    setDragTask(task)
    
  }
  console.log(dragTask);
  
  const handleDragAndDrop=(status)=>{
    const copyTasks=[...tasks]
    let copyTask = copyTasks.map((item) => {
      if (item.id === dragTask?.id) {
       item.status=status 
      }
      return item;
    });
  
    setTasks(copyTask);
    setDragTask(null);
  }

  const handleDrop=(e)=>{
    const status=e.target.getAttribute("data-status")
    console.log("dropping",status);
    if(status===TODO){
      handleDragAndDrop(TODO)
    }
    else if(status===DOING){
      handleDragAndDrop(DOING)
    }
    else if(status===DONE){
      handleDragAndDrop(DONE)
    }
    
  }

  const handleDelete=(task)=>{
    console.log(task.id);
    
    let copyTasks=[...tasks]
    console.log(copyTasks);
    
    copyTasks=copyTasks.filter((item)=>item.id!=task?.id)
    setTasks(copyTasks)
  }

  const handleUpdate=(task)=>{
    setUpdateTask(task)
    setInpValue(task.title)
   
  }

  return (
    <>
    <div className='container text-center mx-auto py-5'>
      <h1  className='pb-3 main__head'>Task Manager</h1>
      <input value={inpValue} onKeyDown={(e)=>handleAddTask(e)} onChange={(e)=>setInpValue(e.target.value)} type="text" name="" id="" placeholder='Add task' className='form-control w-50 mx-auto' />

      <div className="boards d-flex flex-wrap justify-content-center gap-5">
        <div data-status={TODO}  className="task__board todo" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>handleDrop(e)}>
          <h3 className='task__head'>TODO</h3>
          <hr />
          <div className='task__container'>
          { 
           tasks?.length>0&& 
           tasks.map(tsk=>(
            tsk?.status==TODO &&
           <div onDragStart={(e)=>handleDrag(e,tsk)} draggable key={tsk?.id} className='task__item my-2 px-2'>
              <span  className='fs-5  '>
               { tsk?.title}
              </span>
              <div className="buttons">
                <button className='btn' onClick={()=>handleUpdate(tsk)}><i class="fa-solid fa-pen"></i>
                  </button>
                  <button  onClick={()=>handleDelete(tsk)} className=' btn'>
                  <i class="fa-solid fa-trash-can text-danger"></i>
                  </button>
              </div>
            </div>
           ))
            }
          </div>
        </div>
        <div data-status={DOING} className="task__board doing" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>handleDrop(e)}>
        <h3 className='task__head'>DOING</h3>
        <hr />
        <div className='task__container'>
           { 
           tasks?.length>0&& 
           tasks?.map(tsk=>(
            tsk?.status==DOING &&
           <div onDragStart={(e)=>handleDrag(e,tsk)}  draggable key={tsk?.id} className='task__item my-2  px-2'>
              <span  className='fs-5  '>
              { tsk?.title}
              </span>
              <div className="buttons">
                <button onClick={()=>handleUpdate(tsk)} className='btn'><i class="fa-solid fa-pen"></i>
                  </button>
                  <button onClick={()=>handleDelete(tsk)}  className='btn'>
                  <i class="fa-solid fa-trash-can text-danger"></i>
                  </button>
              </div>
            </div>
           ))
            }
          </div>
        </div>
        <div data-status={DONE} className="task__board done" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>handleDrop(e)}>
        <h3 className='task__head'>DONE</h3>
        <hr />
        <div className='task__container'>
          { 
           tasks?.length>0&& 
           tasks?.map(tsk=>(
            tsk?.status==DONE &&
           <div onDragStart={(e)=>handleDrag(e,tsk)}  draggable  key={tsk?.id} className='task__item my-2  px-2'>
              <span  className='fs-5  '>
               { tsk?.title}
              </span>
              <div className="buttons">
                <button onClick={()=>handleUpdate(tsk)} className='btn'><i class="fa-solid fa-pen"></i>
                  </button>
                  <button onClick={()=>handleDelete(tsk)} className=' btn'>
                  <i class="fa-solid fa-trash-can text-danger"></i>
                  </button>
              </div>
            </div>
           ))
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
