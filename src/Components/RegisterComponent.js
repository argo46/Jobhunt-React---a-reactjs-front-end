import React from "react";
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Spinner
} from "reactstrap";
import { Link } from "react-router-dom";

export default function RegisterComponent(props) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card
        style={{
          maxWidth: "600px",
          alignSelf: "center",
          padding: 20,
          marginTop: 60,
          marginBottom: 60,
          borderRadius: 10,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              backgroundColor: "#0760a6",
              margin: "-21px -21px 0px -21px",
              padding: 20,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          >
            <h2 style={{ color: "white" }}>Welcome New</h2>
            <h2 style={{ fontWeight: "bold", color: "white" }}>Hunter</h2>
          </div>
          <Form
            style={{ marginTop: 40, marginBottom: 20, width: 400 }}
            onSubmit={props.onSubmit}
          >
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email@email.com"
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                // type=""
                name="username"
                id="username"
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                // type=""
                name="name"
                id="name"
                placeholder="Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </FormGroup>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
                // marginTop: 40
              }}
            >
              {props.isError ? (
                <Alert className="text-center" color="danger">
                  Register failed, try Again!
                </Alert>
              ) : // <Alert color="danger" style={{}}>
              //   Wrong Email or Password
              // </Alert>
              props.isLoading ? (
                <Spinner style={{ margin: 10 }} />
              ) : (
                <></>
              )}

              <p>
                Have an account?{" "}
                <Link style={{ color: "#0871c2" }}>Login Here!</Link>
              </p>
              <Button style={{ backgroundColor: "#0871c2", width: 150 }}>
                REGISTER
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
