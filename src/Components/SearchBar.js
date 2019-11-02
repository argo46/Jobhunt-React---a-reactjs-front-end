import React, { Component } from 'react'
import {InputGroup, Input, InputGroupAddon, Button} from 'reactstrap'


export default class SearchBar extends Component {

  render() {
    return (
      <InputGroup onKeyDown={this.props.onKeyDownSearch}>
          <Input type="search"
                name="nameSearch"
                id="nameSearch"
                placeholder="Job's Name"
                value={this.props.qname} 
                onChange={this.props.onChangeName}
                />
          <Input type="search"
                placeholder="Company Name"
                name="companySearch"
                onChange={this.props.onChangeCompany}
                value={this.props.qcompany}
                 />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={this.props.doSearch}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
    )
  }
}
