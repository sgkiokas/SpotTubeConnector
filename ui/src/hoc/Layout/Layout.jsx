import React, { Component } from "react";

import Aux from "../Auxiliary/Auxiliary";

import Sidebar from "../../components/UI/Navigation/Navbar/Navbar";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Sidebar />
      </Aux>
    );
  }
}

export default Layout;
