const apiUrl = "https://randomuser.me/api/?";
const listElm = document.querySelector("#list");


let userArgs =[];

const displayUser = (args = userArgs) =>{
    let str = "";

    args.map(usr =>{
        str += `
        <div class="col-md-6 col-lg-3 py-3">
        <div class="card" style="width: 100%;">
            <img src="${usr.picture.large}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">
              ${usr.name.title}
              ${usr.name.first}
              ${usr.name.last}
              </h5>
              <p class="card-text">
              <ul class="list-unstyled">
                <li>
                <i class="fas fa-phone text-center pt-2"></i>
                ${usr.phone}
                </li>

                <li><i class="fas fa-envelope text-center pt-2"></i>${usr.email}</li>

                <li><i class="fas fa-calendar-alt text-center pt-2"></i>${usr.dob.date}</li>

                <li><i class="fas fa-city text-center pt-2"></i>${usr.location.city}</li>
              </ul>
              </p>
              
            </div>
          </div>
    </div>
        `
   
    });

    listElm.innerHTML = str;
    document.getElementById("totalFound").value = `Total User Found = ${args.length}`
    if(args.length === 0){
        alert('User not Found')
    }


}

const fetchUsers = (params = "results=20") => {
    fetch(apiUrl + params)
    .then(response => response.json())
    .then(data =>{
        // console.log(data);
        
        const user = data.results;
        userArgs = data.results;
        displayUser();
        let str = "";
        let gnder = "";
        


        user.map((usr) =>{
            // console.log(usr);
            gnder = usr.gender;

            str +=`
            <div class="col-md-6 col-lg-3 py-3">
            <div class="card" style="width: 100%;">
                <img src="${usr.picture.large}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">
                  ${usr.name.title}
                  ${usr.name.first}
                  ${usr.name.last}
                  </h5>
                  <p class="card-text">
                  <ul class="list-unstyled">
                    <li>
                    <i class="fas fa-phone text-center pt-2"></i>
                    ${usr.phone}
                    </li>

                    <li><i class="fas fa-envelope text-center pt-2"></i>${usr.email}</li>

                    <li><i class="fas fa-calendar-alt text-center pt-2"></i>${usr.dob.date}</li>

                    <li><i class="fas fa-city text-center pt-2"></i>${usr.location.city}</li>
                  </ul>
                  </p>
                  
                </div>
              </div>
        </div>
            `
        });


        listElm.innerHTML = str;

    });
    // .catch(
    //     err=>(
    //         listElm.innerHTML= `<div class="alert alert-danger" role="alert">Opp! something went wrong</div>`
    //     )
    // );
    
};

fetchUsers();

const handleOnChange = e => {
    const params = "results=20&gender=" + e.value;

    fetchUsers(params);
};


const handleOnSearch = () =>{
    const searchStr = document.getElementById("search").value;

    const filteredUser = userArgs.filter((item)=>{   
        const userName = `${item?.name?.first} ${item?.name?.last}`
        console.log(userName,searchStr)
        if(userName.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())){
            return item;
        }
    })
    displayUser(filteredUser);
    console.log(filteredUser);
    
    
}

// const handleOnInput = e =>{
//     const params = "results=20&name=" + e.value;
    
//     fetchUsers(params);
// };
// Gender Female