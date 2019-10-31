import React from 'react'


function RegisterComponent (props) {
  return (
    <form class="form-signin" onSubmit={props.onSubmit} style={{width: '100%', maxWidth: '330px', padding: '15px', margin: 'auto'}}>
      <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
      {/* <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1> */}
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="true" />
      
      <label for="inputPassword" class="sr-only">Username</label>
      <input type="text" name="username" id="inputUsername" class="form-control" placeholder="Username" required="true"/>
      
      <label for="inputPassword" class="sr-only">Name</label>
      <input type="text" name="name" id="inputName" class="form-control" placeholder="Name" required=""/>
      
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required="true"/>
      {/* <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"/> Remember me
        </label>
      </div> */}
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      {/* <p class="mt-5 mb-3 text-muted">© 2017-2019</p> */}
    </form>
  )
}

export default (RegisterComponent)