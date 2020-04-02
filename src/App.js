import React, { Component } from 'react';
import io from 'socket.io-client';
 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
    isConnected:false,
    id:null,
    list:[],
    name:"Abd ELmajeed",
    message:""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value)
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }    
socket = null
  componentWillMount(){  this.socket = io('https://codi-server.herokuapp.com');

 this.socket.on('pong!',(additionalStuff)=>{
    console.log('server answered!', additionalStuff)
    })

this.socket.on('youare',(answer)=>{
  this.setState({id:answer.id})
  })
  this.socket.on('connect', () => {
this.setState({isConnected:true})
})

   this.socket.on('disconnect', () => {
this.setState({isConnected:false})
})

this.socket.on('pong!',()=>{
  console.log('the server answered!');
  })

 
    this.socket.on('peeps',(id)=>{
      const map1 = id.map(x => x + 1);
      this.setState({list:map1})
     
    })
    this.socket.on('next',(message_from_server)=>console.log(message_from_server))

    this.socket.on('answer',(event)=>{
    this.setState({text: event.target.value});
    })  /** this will be useful way, way later **/
this.socket.on('room', old_messages => console.log(old_messages))  }
 componentWillUnmount(){
this.socket.close()
this.socket = null
}
 render() {
return (
<div className="App">
<div>status: {this.state.isConnected ? 'connected' : 'disconnected'}</div>
<div>id: {this.state.id}</div>
<div><ol>{this.state.list.map(reptile => <li>{reptile}</li>)}</ol> </div>
<div><input type="text" onChange={this.handleChange}/></div>
<button onClick={()=>this.socket.emit('ping!')}>ping</button>
<button onClick={()=>this.socket.emit('whoami')}>Who am I?</button>
<button onClick={()=>this.socket.emit('give me next')}>messages</button>
<button onClick={()=>this.socket.emit('addition')}>calculate</button>
<button onClick={() =>this.socket.send({id: this.state.id,name: "Abd ELmajeed",text: this.state.value})}>submit</button>
</div>
);}
}
 export default App;