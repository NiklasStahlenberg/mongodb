let url = "http://localhost:3000/api/courses";

window.onload = getCourses();

//getting all courses and fixing a button for deletes.
function getCourses(){    
    fetch(url)
    .then((res) => res.json())
        .then((data) => {           
           let output = "";
           
           data.forEach(function(course){
               output +=` 
                <tr>                             
                    <td class='courseitems'>${course.Coursecode}</td>
                    <td class='courseitems'>${course.Coursename}</td>
                    <td class='courseitems'>${course.Progression}</td> 
                    <td class='deleteCell'><span class='deleteBtn' onclick = 'deleteCourse(\"${course._id}\")'>Delete</span></td>
                </tr>           
               `;
           })
           document.getElementById("output").innerHTML += output; 
        })        
}

//delete function with fetch
function deleteCourse(id){
    fetch(url + '/delete/' + id, {
        method: 'DELETE'        
    }).then(response => {
        response.json()
        location.reload();
    })        
        .catch(err => {
            console.log(err);
        })
}

//add course with fetch
document.getElementById("submitCourseBtn").addEventListener('click', function(e){
    e.preventDefault();

    let coursename = document.getElementById("Coursename").value;
    let coursecode = document.getElementById("Coursecode").value;
    let progression = document.getElementById("Progression").value;

    let formdata =  JSON.stringify({
        Coursecode: coursecode,
        Coursename: coursename,
        Progression: progression
    });    

    fetch(url + '/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formdata
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('success:', data);
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

});
      
 