// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import App from '../App';

// export const PrivateRoute = ({component: Component, ...rest}) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if(1){
//           return <Component {...props} />;
//         }
//         else{
//           return <Redirect to={
//             {
//               pathname :'/join',
//               state:{
//                 from : props.location
//               }
//             }
//           } />
//         }
//       }}
//       />
//     );
//   };

// // export default PrivateRoute;
