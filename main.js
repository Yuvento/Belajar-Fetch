let page = 1;
let limit = 10;
let todos = [];
let keyword = "";


fetch("https://jsonplaceholder.typicode.com/todos")
    .then((data)=>{
        console.log(data);
        return data.json();
    }).then((data)=>{
        todos = data
        render();

    })

function render (){

    const filtered = todos.filter(todo => {
        if (todo.title.toLowerCase().includes(keyword)) return todo
    })
    const sliceTodos = filtered.slice((page-1)*limit, page*limit);
    const TodoAr = sliceTodos.reduce((a,b)=>{
        return (a +=`
        
            <div class="card col-5 ms-4 mt-4" >
                    <div id="card" class="card-body">
                        <h5>${b.title}</h5>
                        <h6>${b.completed ? `<span style="color:green">complete</span>` : `<span style="color:red">not complete</span>`}</h6>
                    </div>
            </div>
            
        `
            
            )
    },'')
    document.getElementById(`card`).innerHTML=TodoAr;
    document.getElementById("page-indicator").innerHTML=page;

    if(page > 1){
        document.getElementById("previous").classList.remove("disabled");
    }else {
        document.getElementById("previous").classList.add("disabled");
    }

}

document.getElementById("next").addEventListener("click",()=>{
    if(page===10){
        return
    }
    page= page+1;
    render()
    
})

document.getElementById("previous").addEventListener("click",()=>{ 
    if(page===1){
        return 
    }
    page= page-1;
    render()
    
})


document.getElementById("select-form").addEventListener("change",(e)=>{
    limit = e.target.value;
    render()
})


document.getElementById("searchform").addEventListener("keyup",(e)=>{ 
    keyword = e.target.value;
    render()

    
   
    
})

