//document.ready de js para arrancar cuando este toda la page cargada
$(function(){
    
    $('#myForm').on('submit', function(e){
      //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
      e.preventDefault();
      $('#githupapidata').html('<div id="loader"><img src="https://i.imgur.com/UqLN6nl.gif" alt="loading..."></div>');
      
      //varibles de nombre de usuario y repositorio de github
      var username = $('#ghusername').val();
      var requri   = 'https://api.github.com/users/'+username;
      var repouri  = 'https://api.github.com/users/'+username+'/repos';
      
      //llamamos al json
      requestJSON(requri, function(json) {
        if(json.message == "mi no encontrar" || username == '') {
          $('#githupapidata').html("<h2>sin info del user</h2>");
        }
        
        else {
          // mostrar info del user
          var fullname   = json.name;
          var username   = json.login;
          var aviurl     = json.avatar_url;
          var profileurl = json.html_url;
          var location   = json.location;
          var watchers = json.watchers;
          var followersnum = json.followers;
          var followingnum = json.following;
          var reposnum     = json.public_repos;
          
          if(fullname == undefined) { fullname = username; }
          
                  //devuelve el texto contenido en las etiquetas html y las propias etiquetas.
  
          var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
          outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
          outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'<br>Watchers:'+watchers+'</p></div>';
          outhtml = outhtml + '<div class="repolist clearfix">';
          
          //Funcion para mostrar la informacion requerida
          var repositories;
          $.getJSON(repouri, function(json){
            repositories = json;   
            outputPageContent();                
          });          
          
          //Crea un listado de repositorios publicos
          function outputPageContent() {
            if(repositories.length == 0) { outhtml = outhtml + '<p>No hay repos hooooy!</p></div>'; }
            else {
              outhtml = outhtml + '<p><strong>Lista de repositorios:</strong></p> <ul>';
              $.each(repositories, function(index) {
                outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
              });
              outhtml = outhtml + '</ul></div>'; 
            }
            $('#githupapidata').html(outhtml);
          } // final del contenido de pagina()
        } // final de la demanda
      }); // finaliza la demanda del json
    }); // finaliza el evento click 
    
    //Llamada a las URL's de cada elemento mostrado
    function requestJSON(url, callback) {
      $.ajax({
        url: url,
        // creando el XMLHttpRequest
        complete: function(xhr) {
          callback.call(null, xhr.responseJSON);
        }
      });
    
    }
  
  });