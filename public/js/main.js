// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    // const input = document.querySelector( "#yourname" ),
    //     json = { yourname: input.value },
    //     body = JSON.stringify( json )

    const taskInput = document.querySelector("#taskDescription");
    const dateInput = document.querySelector("#dueDate");

    // Create JSON object with form data
    const json = {
        taskDescription: taskInput.value,
        taskDate: dateInput.value
    };
    const body = JSON.stringify(json);

    const response = await fetch( "/submit", {
        method:'POST',
        body
    })

    const text = await response.text()
    // console.log( "text:", text )

    // Makes a JSON object with the task description and due date
    const information = JSON.parse(text)

    // Select the template with the task list
    const listOfTasks = document.querySelector(".task-list")
    // Clear the list of tasks
    listOfTasks.innerHTML = ""

    // Select the task template
    const taskTemplate = document.querySelector("#task-template")

    // Number of tasks in the list
    let numOfTasks = 0

    
    // Add the updated tasks to the task template
    information.forEach((task, taskId) => {
        // Add the task description from the form to each new task
        const clone = taskTemplate.content.cloneNode(true);
        
        clone.querySelector(".task-item").innerHTML = task.taskDescription
        //listOfTasks.appendChild(clone)

        // Make an edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");

        // Add event listener to handle editing
        editButton.addEventListener("click", () => {
        const newDescription = prompt("Edit task description:", task.taskDescription);
        if (newDescription !== null && newDescription.trim() !== "") {
            console.log("New Description: " ,newDescription)
            //console.log("This is the task ID: ",taskId)

            
            // Update the task description
            task.taskDescription = newDescription; 
            console.log("The description is updated just not the ui")
            console.log(task.taskDescription)
            // Update the UI
            clone.querySelector(".task-item").innerHTML= newDescription; 
            
        }
        });

        // Append the Edit button to the top of the task item
        clone.prepend(editButton);
        listOfTasks.appendChild(clone);


        // Show the id of the task
        console.log("task id: " ,taskId)

        // Increase the number of tasks with each new task
        numOfTasks++
        //console.log(numOfTasks)
    });

    // Select the item-counter class to change the number
    document.querySelector(".item-counter").innerHTML = numOfTasks.toString()
}

window.onload = function() {
    const submitbutton = document.querySelector("#submitBtn");
    submitbutton.onclick = submit;

    // const clearbutton = document.querySelector("#clearBtn");
    // clearbutton.onclick = clear;
}
