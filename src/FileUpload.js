//importar lo qu necesitemos
import React, { Component } from 'react';
//import Firebase from 'firebase';
//crear compoenente 
class FileUpload extends Component{ //esto es ecmascript 6
	//llamar el metodo constructor de FileUpload
	constructor(){
		super();//llama al constructor de Component
		//estado del compoenente de subida
		this.state = {
			uploadValue: 0
			//picture:null
		};
		//this.handleUpload = this.handleUpload.bind(this);
	}	
	/*handleUpload (event) {
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
				this.setState({
					uploadValue: 100,
					picture: task.snapshot.downloadURL
				});
			});
	}*/
	//metodo render
	render() {
		return (
			//esto devuelve JSX
			<div>
				<progress value={this.state.uploadValue} max="100"></progress>
				<br/><br/>
				<input type="file" onChange={ this.props.onUpload }/><br/>
			</div>
		);
	}
 }
//exportar mi componente
export default FileUpload;