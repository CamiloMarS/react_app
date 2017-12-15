import React, { Component } from 'react'; //lo que esta en llaves en Object Structure
import Firebase from 'firebase'; //modulo importado de firebase
import './App.css'; //así importamos modulos o ficheros esto es ecma6, tambien existe requeri
import FileUpload from './FileUpload';

class App extends Component {//nueva forma de generar clases con ecmascript 6
  
  //para el estado del login
  constructor (){
    super(); //llama al constructor de la clase "Component"
    this.state = {
      user: null,
      pictures:[]
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  componentWillMount(){
    //para llamadas ajax, integrar otras librerias etc
    Firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
    Firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  //My funcion para iniciar sesion con gmail
  handleAuth(){
    const provider = new Firebase.auth.GoogleAuthProvider();//crear un provedor de google para utilizar

    //devulve una promesa
    //template string de ECMA6
    Firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesión`))
    //las promesas en JavaScript se resulven con them
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));//por si hay algun error
  }

  handleLogout(){
    Firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha cerrado sesión`))//las promesas en JavaScript se resulven con them
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));//por si hay algun error
  }

  //video 4
  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = Firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue: percentage
        })
      }, 
      error => {
        console.log(error.message)
      }, 
      () => {
          const record = {
            photoURL: this.state.user.photoURL,
            displayName: this.state.user.displayName,
            image: task.snapshot.downloadURL
          };

        //almacenar el objeto a la bd
        const dbRef = Firebase.database().ref('pictures');
        const newPicture = dbRef.push();
        newPicture.set(record);
      });
  }

  //mostrar informacion del usuario quien inicie sesion
  renderLoginButton(){//renderiza sintaxis html
      //si el usuario esta logueado
      /*FUNCIONALIDAD DE REACT, los compenentes en read, pueden tener estado*/
      if (this.state.user) {
        return (
          <div>
            <img width="100px" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
            <p>Hola { this.state.user.displayName }!</p>
            <button onClick={this.handleLogout}>Salir</button>
            <FileUpload onUpload={ this.handleUpload }/>            
            {
              this.state.pictures.map(picture => (
                <div>
                    <img src={ picture.image } alt="" width="40"/>
                    <br/>
                    <img src={ picture.photoURL } alt={ picture.displayName }/>
                    <br/>
                    <span>{ picture.displayName }</span>
                </div>
              )).reverse()
            }

          </div>
          );
      } else {     
        return (  
          //si no lo está mostramos el botton para loguease
        <button onClick={this.handleAuth}>Login with Google</button>
        );
      } 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Pseudogram</h1>
        </header>
        <p className="App-intro">
          { this.renderLoginButton() }
        </p>
      </div>
    );
  }

}//end class

export default App;
//así exportamos la clase, cada vez que importemos en otro .js este archivo, solo jala App
