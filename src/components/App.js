import React from 'react';
import routes from '../route';
import {renderRoutes} from '../common/routes';
import '../style/Game.css';

function App() {
  return (
    <div className="App">
       {/* <!-- Main content --> */}
    <div className="container-page">{renderRoutes(routes)}</div>
    {/* <!-- end Main content --> */}
    </div>
  );
}

export default App;
