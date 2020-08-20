// let k = [
//     {
//         _id: "12345",
//         position: {},
//         main: 'xyz'
//     },
//     {
//         _id: "123456",
//         position: {},
//         main: 'xyz2'
//     },
//     {
//         _id: "123457",
//         position: {},
//         main: 'xyz3'
//     },
// ];

// // let k1 = k[2] === 5 ? (() => 78)() : k[2];

// let k1 = k.map(val => {
//     return((() => {
//         return {_id: val._id,position: val.position}
//     })())
// })

// console.log(k1);

// let k = [1,2,4,5,6];

// let k1 = k.filter(val => {
//     if(val === 4)
//         return false;
//     else return true;
// })

// console.log(k1);

{/* <form className = "contact" onSubmit = {this.onSubmit}>
                    <div className="details" style = {{marginTop: "80px"}}>
                        <div className="red-bg">
                            <h1 style = {{color: "black", paddingTop: "30px", fontWeight: "bold", fontSize: "50px"}}>Sign in</h1>
                            <div className="form">
                                <div className="inputbox">
                                    <inpu className={classnames("", {invalid: errors.email || errors.emailnotfound})} error = {errors.email} type="text" name = "username" value = {this.state.username} onChange = {this.onChangeListner} id="email" placeholder="Email Address"/>
                                </div>
                                <div className="inputbox">
                                    <input className={classnames("", {invalid: errors.password || errors.passwordincorrect})} error = {errors.password} type="password" name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password" placeholder="Password"/>
                                </div>
                                <div className="inputbox1">
                                    <button className="button-main" type = "submit" style = {{backgroundImage: "linear-gradient(#ffffff, #bebebe)", width: "fit-content", padding: "10px 30px"}} ><span style= {{color: "black", fontSize: "xx-large", fontWeight: "bold"}}>Sign in</span></button>
                                </div>
                                <div style = {{borderBottom: "1px solid white", width: "90%", margin: "auto", paddingTop: "20px"}}></div>
                            </div>
                            <div style ={{padding: "10px"}}>
                            <p style = {{color: "white", fontSize: "18px"}}>Don't have an accout? <Link to = '/register' style = {{color: "white"}}>Sign up</Link></p>
                            </div>
                        </div>
                    </div>
                </form>


<form className = "contact" onSubmit = {this.onSumbit}>
                    <div className="details">
                        <div className="red-bg">
                            <h1 style = {{color: "black", paddingTop: "30px", fontWeight: "bold", fontSize: "50px"}}>Sign Up</h1>
                            <div className="form">
                                <div className="inputbox">
                                    <input className={classnames("", {invalid: errors.name})} error = {errors.name} type="text" name = "name" value = {this.state.name} onChange = {this.onChangeListner} id="name" placeholder="Name"/>
                                </div>
                                <div className="inputbox">
                                    <input className={classnames("", {invalid: errors.email})} error = {errors.email} type="text" name = "username" value = {this.state.username} onChange = {this.onChangeListner} id="email" placeholder="Email Address"/>
                                </div>
                                <div className="inputbox">
                                    <input className={classnames("", {invalid: errors.password})} error = {errors.password} type="password" name = "password" value = {this.state.password} onChange = {this.onChangeListner} id="password1" placeholder="Password"/>
                                </div>
                                <div className="inputbox">
                                    <input className={classnames("", {invalid: errors.password2})} error = {errors.password2} type="password" name = "password2" value = {this.state.password2} onChange = {this.onChangeListner} id="password2" placeholder="Confirm Password"/>
                                </div>
                                
                                <div className="inputbox1">
                                    <button className="button-main" type = "submit" style = {{backgroundImage: "linear-gradient(#ffffff, #bebebe)", width: "fit-content", padding: "10px 30px"}} ><span style= {{color: "black", fontSize: "xx-large", fontWeight: "bold"}}>Sign Up</span></button>
                                </div>
                                <div style = {{borderBottom: "1px solid white", width: "90%", margin: "auto", paddingTop: "20px"}}></div>
                            </div>
                            
                            <div style ={{padding: "10px"}}>
                            <p style = {{color: "white", fontSize: "18px"}}>Already have an accout? <Link to = '/login' style = {{color: "white"}}>Sign in</Link></p>
                            </div>
                        </div>
                    </div>
                </form> */}