import React from 'react'
import {Alert, Card} from 'reactstrap'


function LoginComponent (props) {
  return (
    <div>
    <Card style={{width: '100%', maxWidth: '330px', padding: '15px', margin: '50px auto auto auto'}}>
    <form class="form-signin" onSubmit={props.onSubmit} >
      <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" />
      <label for="inputPassword" class="sr-only" required="">Password</label>
      <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required=""/>
      {/* <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"/> Remember me
        </label>
      </div> */}
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      {/* <p class="mt-5 mb-3 text-muted">© 2017-2019</p> */}
    </form>
    </Card>
    {
      props.isError? <Alert className="text-center" color="danger" style={{marginTop:'30px'}}>Wrong Email or Password</Alert> : <Alert color="danger" style={{display:'none'}}>{props.errorMassage} </Alert>
    }
    </div>

  )
}

export default (LoginComponent)