function queryApi(username){
    //para que haga una busqueda en el repositorio de la persona
    //` se usa para las variables
    //fetch es para unir
    return fetch(`https://api.github.com/users/${username}/repos`)
    //cuando se ejecuta quiero que me retorne...
    .then(response => response.json());
};



new Vue({
    el:'#app',
    data:{
        username:'',
        repos:[]
    },
    watch:{
        username:function(newValue,oldValue){
            queryApi(this.username).then(repos=>{
                // if(repos.lenght > 0 && repos[0].id)
                this.repos =repos;
            });
        }
        
    },    
})