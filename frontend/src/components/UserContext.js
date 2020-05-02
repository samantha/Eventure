import React, { createContext } from "react";

export const UserContext = createContext({
  user: {},
  toggleUser: () => {},
}); // pass in value provided when try to use context with no provider, import UserContext in App

export const UserProvider = UserContext.UserProvider;

export const UserConsumer = UserContext.Consumer;

// const UserContext = React.createContext(null); // Create a context object

// export {
//   UserContext // Export it so it can be used by other Components
// };

// export const UserProvider = UserContext.UserProvider;

// export const UserConsumer = UserContext.Consumer;

// class UserProvider extends React.Component {
//   // Context state
//   state = {
//     user: {},
//   }

//   // Method to update state
//   setUser = user => {
//     this.setState(prevState => ({ user }))
//   }

//   render() {
//     const { children } = this.props
//     const { user } = this.state
//     const { setUser } = this

//     return (
//       <UserContext.Provider
//         value={{
//           user,
//           setUser,
//         }}
//       >
//         {children}
//       </UserContext.Provider>
//     )
//   }
// }

// export { UserProvider }

// export const UserConsumer = UserContext.Consumer;
