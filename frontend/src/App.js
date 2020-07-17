import React, { useState } from 'react';
import Routes from './routes';
import { UserContext, user as userInitalState } from './UserContext';

const App = () => {
  const [user, setUser] = useState(userInitalState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes />
    </UserContext.Provider>
  );
};
export default App;
