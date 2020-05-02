import { UserContext } from "../../components/UserContext";
import React from "react";

function UserSwitcher() {
  // The User Switcher receives not only the user
  // but also a user switcher function from the context
  return (
    <UserContext.Consumer>
      {({ user, setUser }) => <button onClick={setUser}>hello</button>}
    </UserContext.Consumer>
  );
}

export default UserSwitcher;
